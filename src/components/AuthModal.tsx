"use client";
import { motion } from "motion/react";
import { X } from "lucide-react";

type AuthModalProps = {
    open: boolean;
    onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  
    return (
        <>
        {open && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            >
                <motion.div 
                initial={{opacity:0, scale:0.95, y:40}}
                animate= {{opacity:1, scale: 1, y:0}}
                transition= {{duration: 0.35, ease: "easeOut" }}
                className = "fixed inset-0 flex items-center justify-center px-4"
                >
                    <div className = "relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                    <div className= "absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <X size={20}/>
                    </div>
                    </div>

                </motion.div>
            </motion.div>
        )}
        </>
    )
}       