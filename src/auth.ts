import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "./app/models/user.model";
import connectDb from "./lib/db";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*****"
        }
      },
      async authorize(credentials, request) {
         if(!credentials?.email || !credentials?.password){
          throw new Error("Email and password are required!")
         }
         const email = credentials.email;
         const password = credentials.password as string;
         await connectDb();
         const user = await User.findOne({email});
         if(!user){
          throw new Error("Invalid email or password!")
         }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if(!isPasswordValid){
            throw new Error("Invalid email or password!")
          }
          
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks: {
    async signIn({user,account}){
      if(account?.provider === "google"){
        await connectDb();
        const existingUser = await User.findOne({email: user.email});
        if(existingUser){
          user.id = existingUser._id.toString(); 
          user.role = existingUser.role;                 
          return true;
        }
        const newUser = await User.create({
          name: user.name,
          email: user.email,
          role: "user"
        });
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      } 
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name  as string;
        session.user.email = token.email  as string;
        session.user.role = token.role as "user" | "partner" | "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  secret: process.env.AUTH_SECRET
})