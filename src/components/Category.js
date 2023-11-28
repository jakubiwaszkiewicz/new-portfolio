import React from 'react'
import { motion } from 'framer-motion';

export default function Category({categoryName, categoryImg}) {
    return (
        <motion.div
            whileHover={{
                opacity: 1,
                scale: 1.1,
                boxShadow: "10px 10px 0 rgba(255, 255, 255, 0.1)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className='
                bg-black
                flex
                flex-col
                justify-center
                items-center
                bg-opacity-50
                rounded-xl
                min-w-[300px]
                p-2
                m-3
                lg:p-5
                lg:m-10
        '>
            <img
                className='
                    w-[120px]
                    h-[120px]
                    lg:w-[250px]
                    lg:h-[250px]
                    object-cover'
                src={categoryImg}
                alt=""
            />
            <h1 className='
                uppercase
                tracking-[4px]
                lg:tracking-[8px]
                text-white
                text-md
                lg:text-md
                mt-1
                lg:mt-3
                font-semibold
                text-center
            '>
                &nbsp;{categoryName}
            </h1>
        </motion.div>
    )
}
