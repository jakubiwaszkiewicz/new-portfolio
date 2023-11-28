import React from 'react';
import Category from './Category';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.png';

function Projects() {
    return (
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
                &nbsp;Projects
            </h1>

            <div
                className='
                relative
                w-full
                flex
                z-20
                flex-col
                lg:flex-row
                justify-center
                items-center
                basis-full
                mt-20
            '> 
                <Link to='/projects'>
                    <Category
                        categoryName='Click here to see my projects!'
                        categoryImg={bg}
                    />
                </Link>
            </div>
        </div>
    );
}

export default Projects;