import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageIcon from '@mui/icons-material/Image';

export default function Portfolio() {
  const API_URL = process.env.REACT_APP_API_URL;



  let { dataProjectsAPI } = useLoaderData().results;
  dataProjectsAPI = dataProjectsAPI.data;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5, // Add stagger effect to children
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 100,
      },
    },
  };

  return (
    <div>
      <div className='w-100 min-h-screen flex flex-wrap flex-col items-center justify-center max-w-7xl mx-auto'>
        <h1 className='nonAbsoluteTitle text-center'>
          My Projects
        </h1>
        <h1 className='nonAbsoluteTitle text-center text-lg'>
          (click on a project for more info)
        </h1>
        <motion.div
          className='flex flex-wrap items-center justify-center'
          initial='hidden'
          animate='visible'
          variants={containerVariants}
        >
          {dataProjectsAPI.map((project) => {
            console.log(project.attributes.images.data)
            return(
              <motion.div
                initial='hidden'
                animate='visible'
                variants={projectVariants}
                className='w-[350px] min-h-[350px] m-5 p-7 bg-black bg-opacity-50 opacity-90 rounded-md flex flex-col justify-center items-center '
                whileHover={{ scale: 1.05, opacity: 1 }}
                key={project.id}
              >
                <Link to={`/project/${project.id}`} className='cursor-pointer' >
                  {
                    project.attributes.images.data == null ?
                    <ImageIcon className=' text-white' style={{
                      width:"300px",
                      height:"250px",
                    }}/>
                    :
                    <img
                      className='object-cover rounded-lg border-[#dddddd] border'
                      src={`${API_URL}${project.attributes.images?.data[0].attributes.formats.medium.url || ImageIcon }`}
                      alt=''
                    />
                  }
                  <h1 className='decoration-1 font-light lg:text-2xl text-xl underline underline-offset-2 mb-3 sm:max-w-[500px] sm:max-h-[350px] max-w-[250px] max-h-[200px] tracking-[6px] text-center'>{project.attributes.title}</h1>
                </Link>
              </motion.div>
              )
            
          })}
        </motion.div>
      </div>
    </div>
  );
}
