declare module "next-auth"{
    interface User {
        role: "user" | "partner" | "admin";
    }
}

export {}