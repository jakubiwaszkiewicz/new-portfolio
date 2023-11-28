import React from 'react';
import { motion } from 'framer-motion';

function BackgroundCircles() {
    return (
        <motion.div
            className='relative flex justify-center items-center'
            initial={{
                opacity: 0.2,
            }}
            animate={{
                scale:[1, 1, 1, 1, 1],
                opacity: [1, 1, 1, 1, 1, 1.0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"]
            }}
            transition={{
                duration: 5,
            }}>
            <div className='absolute border-8 border-[#ffffff] rounded-full h-[150px] w-[160px] mt-52 blur'/>
            <div className='absolute border border-[#ffffff] rounded-full h-[140px] w-[160px] mt-52 animate-ping blur'/>
            <div className='absolute border border-[#ffffff] rounded-full h-[650px] w-[650px] mt-52 animate-pulse blur'/>
        </motion.div>
    );
}

export default BackgroundCircles;