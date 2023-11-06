import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

function Box(props: any) {
    const ref = useRef(null);

    return <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        exit={{ x: "-100%" }}
        className="absolute bg-white bg-opacity-70 w-full h-56" ref={ref} >
        <Button {...props}>x</Button>
    </motion.div >;
}

export default function Box2() {
    const [show, setShow] = useState(true);

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="mb-10">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setShow(!show);
                    }}
                >
                    <div className="w-fit h-fit p-2 bg-red-500">Character 1</div>
                </motion.button>
            </div>
            <AnimatePresence>{show ? <Box className="absolute right-0 m-2" onClick={() => {
                console.log("hide")
                setShow(false);
            }} /> : null}</AnimatePresence>
        </div>
    );
}
