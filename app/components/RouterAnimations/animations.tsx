"use client";
import { AnimatePresence, HTMLMotionProps, motion, useAnimationControls } from "framer-motion";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const variants = {
    hidden: { opacity: 0, x: "-5%", y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

export default function RouteAnimation({ children }: { children: React.ReactNode }) {
    const divControl = useAnimationControls();
    return (< AnimatePresence >
        <motion.div className="absolute w-[100vw] h-[100vh] bg-background"
            variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'linear' }} // Set the transition to linear
        >
            {children}
        </motion.div>
    </AnimatePresence >)
}