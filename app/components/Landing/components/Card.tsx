import React, { ReactNode } from 'react'
import { motion } from "framer-motion"

export const Card = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ ease: [0.65, 0.2, 0.35, 1], delay: 0.05, duration: 0.8 }}
        variants={{
          visible: { opacity: 1, scale: 1, y: 0 },
          hidden: { opacity: 1, scale: 0.9,  y: 300 }
        }}
         className="rounded-3xl dark:bg-[#504b60] bg-white dark:bg-opacity-90 font-logo-font dark:text-gray-50 text-black font-light md:text-xl lg:text-[30px] lg:leading-relaxed p-10 max-w-[30vw] flex flex-col items-center">
            {children}
        </motion.div>
    );
} 