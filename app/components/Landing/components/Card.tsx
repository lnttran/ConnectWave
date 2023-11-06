import React, { ReactNode } from 'react'
import { motion } from "framer-motion"

export const Card = ({ children }: { children: ReactNode }) => {
    return (
        <div className="rounded-3xl font-logo-font dark:text-gray-50 text-black font-light md:text-xl lg:text-[30px] lg:leading-relaxed p-10 max-w-[30vw] flex flex-col items-center dark:bg-[#504b60] bg-white dark:bg-opacity-90">
            {children}
        </div>
    );
} 