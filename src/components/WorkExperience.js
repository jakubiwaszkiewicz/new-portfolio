import React from 'react';
import ExpCard from './ExpCard';
import { motion } from 'framer-motion';
function WorkExperience({ expData, expDataAPI }) {

    const API_URL = process.env.REACT_APP_API_URL;
    return (
        <div>
            <div className='
                h-screen
                relative
                flex
                overflow-hidden
                flex-col
                text-left
                md:flex-row
                max-2-full
                justify-evenly
                mx-auto
                items-center
                z-0'
            >
                <h1 className='sectionTitle'>
                    &nbsp;Experience
                </h1>
                <div
                    
                    className='
                        relative
                        w-full
                        flex
                        overflow-x-scroll
                        overflow-y-hidden
                        snap-x  
                        snap-mandatory
                        z-20
                        scrollbar
                        scrollbar-track-gray-400/20
                        scrollbar-thumb-[#ffffff]
                        mt-10'
                        
                >
                    {expDataAPI.data.map((item) => (
                        <ExpCard
                            key={item.id}
                            img={`${API_URL}${item.attributes.image.data.attributes.formats.large?.url || item.attributes.image.data.attributes.formats.small.url}`}
                            title={item.attributes.title}
                            date={item.attributes.date}
                            whatHaveIDoneHere={item.attributes.description}
                        />))}
                </div>
            </div>
        </div>
    );
}

export default WorkExperience;