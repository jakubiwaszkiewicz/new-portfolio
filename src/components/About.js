import React from 'react';
import { motion } from 'framer-motion';

function About({ desc, photo }) {
    return (
            <motion.div
                initial={{
                    opacity: 0,
                }}
                whileInView={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                }}
                className='relative flex flex-col h-screen md:text:left md:flex-row max-w-7xl lg:px-10 px-3 justify-center mx-auto items-center'
            >
                
                <h3 className='sectionTitle'>
                    &nbsp;About
                </h3>
                    <div
                        className='mt-10 bg-black bg-opacity-50 rounded-lg lg:p-10 p-5 flex flex-col md:text-left md:flex-row max-w-7xl justify-evenly mx-auto items-center'
                    >
                        <motion.img
                            src={photo}
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 1,
                            }}
                            viewport={{ once: true }}
                            className='
                                lg:mb-10
                                mb-5
                                w-30
                                h-30
                                object-cover
                                rounded-lg
                                md:w-[450px]
                                md:h-[500px]
                                md:max-w-[300px]
                                md:max-h-[350px]
                                lg:max-w-[450px]
                                lg:max-h-[500px]
                                xl:w-[450px]
                                xl:h-[500px]
                                bg-black bg-opacity-50'
                        />

                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 1,
                            }}
                            className='space-y-10 px-0 md:px-10'
                        >
                            <h4 className="text-4xl font-semibold tracking-widest">
                                H<span className='underline decoration-[#ffffff] tracking-widest underline-offset-8'>iii!</span> 
                            </h4>
                            <p className='md:text-base text-sm text-justify'>
                                {desc}
                            </p>
                        </motion.div>
                    </div>
            </motion.div>
        );
}

export default About;