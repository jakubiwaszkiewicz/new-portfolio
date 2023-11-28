import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { motion, useAnimation  } from 'framer-motion';
const API_URL = process.env.REACT_APP_API_URL;

export default function Project() {

  let { dataProjectsAPI } = useLoaderData().results;

  const { id } = useParams();
  const[mainImg, setMainImg] = useState(0)

  let arr=[]
  let projectImages = []
  let projectsData = []
  for (let i = 0; i < dataProjectsAPI.data.length; i++) {
    if (dataProjectsAPI.data[i].id == Number(id)) {
      projectImages = dataProjectsAPI.data[i].attributes.images.data
      projectsData = dataProjectsAPI.data[i]
    }
  }
  for (let i = 0; i < projectImages.length; i++) {
    let url = projectImages[i].attributes.formats.small.url
    arr.push(`${API_URL}${url}`)
  }
  // max 5 zdjęć
    return (
      <motion.div
        viewport={{ once: true }}
        className="py-[20px] px-[50px] flex justify-center gap-4 lg:my-12"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2
          }}
          className="flex gap-2 flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-normal"
        >
          <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
            className="flex-1 flex flex-row flex-wrap lg:flex-col lg:items-start items-center justify-center"
          >
            {arr.map((img, index) => {
              return (
                <motion.img
                  src={img}
                  alt=""
                  onClick={e=>setMainImg(index)}
                  className='lg:w-[150px] lg:h-[150px] w-[75px] h-[75px] object-cover m-[10px] cursor-pointer'
                  key={index}
                  whileHover={{ scale: 1.05 }} // Apply hover effect her
                  transition={{
                    type: 'spring',
                    damping: 6,
                    stiffness: 200,
                  }}
                />
              )
            })}
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.6
            }}
            className="flex-[3_3_0%] flex item-center justify-center"
          >
            <img src={arr[mainImg]} alt="" className='max-h-[800px] object-conatin'/>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.8
            }}
            className="flex-1 flex flex-col gap-2 bg-black bg-opacity-50 lg:text-base text-sm h-fit p-5">
            <h1 className=''>{projectsData.attributes.title}</h1>
            <p>
              {projectsData.attributes.description}
            </p>
            <div className="info">
              <span>id: {projectsData.id}</span>
              <br/>
              <span>Technologies used: {projectsData.attributes.technologies}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
