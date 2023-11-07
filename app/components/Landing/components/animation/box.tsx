import React, { useState, useRef, useEffect, ReactNode } from "react";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";

// function Box(props: any) {
//     const ref = useRef(null);

//     return <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", duration: 0.5 }}
//         exit={{ scale: 0 }}
//         {...props} ref={ref} >
//     </motion.div >;
// }

const CharacterCard = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            // whileHover={{ scale: 1.1 }}
            // onHoverStart={e => { }}
            // onHoverEnd={e => { }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            // transition={{ ease: [0.65, 0.2, 0.35, 1], delay: 0.05, duration: 0.8 }}
            // variants={{
            //     visible: { opacity: 1, scale: 1, y: 0 },
            //     hidden: { opacity: 1, scale: 0.9, y: 300 }
            // }}
            className="rounded-xl dark:bg-[#edafb8] bg-white font-logo-font dark:text-gray-50 text-black font-light md:text-xl lg:text-[30px] lg:leading-relaxed p-5 max-w-[30vw] flex flex-col items-center">
            {children}
        </motion.div>
    );
}

function Box2() {
    const [showQuester, setShowQuester] = useState(false);
    const [showHunter, setShowHunter] = useState(false);
    return (
        <div className="flex flex-row justify-around">
            <div className="flex justify-center h-[60vh] max-w-[90vw]">
                <motion.div
                    className="dark:bg-[#edafb8] dark:bg-opacity-50 bg-white p-3 rounded-3xl"
                    whileHover={{
                        scale: 1.01,
                        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                    }}
                    transition={{
                        layout: {
                            duration: 1,
                            type: "spring",
                        },
                    }}
                    onClick={() => {
                        setShowQuester(!showQuester);
                        if (showHunter) {
                            setShowHunter(false);
                        };
                    }}
                >
                    <motion.div className={"flex flex-row p-4 justify-center items-center w-[" + (!showHunter ? "80vw" : "30vw") + "]"}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={{
                            visible: { opacity: 1, scale: 1, y: 0 },
                            hidden: { opacity: 1, scale: 0.9, y: 300 }
                        }}
                    >
                        {!showHunter &&
                            <img className="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter dark:grayscale dark:hover:grayscale-0" src="/quester.png" />
                        }
                        {showQuester && (
                            <TypeAnimation
                                splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
                                sequence={[
                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                                    3000,
                                    '',
                                ]}
                                cursor={false}
                                speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                                omitDeletionAnimation={true}
                                repeat={2}
                                // style={{ fontSize: '1em', display: 'block', minHeight: '200px' }}
                                className="font-logo-font text-[2rem]"
                            />
                        )}
                    </motion.div>
                </motion.div>
            </div>
            <div className="flex justify-center h-[60vh] max-w-[90vw]">
                <motion.div
                    className="dark:bg-[#edafb8] dark:bg-opacity-50 bg-white p-3 rounded-3xl"
                    whileHover={{
                        scale: 1.01,
                        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                    }}
                    transition={{
                        layout: {
                            duration: 1,
                            type: "spring",
                        },
                    }}
                    onClick={() => {
                        setShowHunter(!showHunter);
                        if (showQuester) {
                            setShowQuester(false);
                        };
                    }}
                >
                    <motion.div className={"flex flex-row p-4 justify-center items-center w-[" + (!showHunter ? "80vw" : "30vw") + "]"}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={{
                            visible: { opacity: 1, scale: 1, y: 0 },
                            hidden: { opacity: 1, scale: 0.9, y: 300 }
                        }}
                    >
                        {!showQuester &&
                            <img className="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter dark:grayscale dark:hover:grayscale-0" src="/hunter.png" />
                        }
                        {showHunter && (
                            <TypeAnimation
                                splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
                                sequence={[
                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                                    3000,
                                    '',
                                ]}
                                cursor={false}
                                speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                                omitDeletionAnimation={true}
                                repeat={2}
                                // style={{ fontSize: '1em', display: 'block', minHeight: '200px' }}
                                className="font-logo-font text-[2rem]"
                            />
                        )}
                    </motion.div>
                </motion.div>
            </div>

        </div>
    );
}


export default Box2;

