import React from 'react'
import { useForm } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';

function ContactMe({ data }) {

  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`
    );
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='relative h-screen flex flex-col text-center lg:px-10 md:text-left max-w-4xl justify-center mx-auto items-center'
    >
        <h1 className='sectionTitle'>
            &nbsp;Contact
        </h1>

        <div className='flex flex-col space-y-10 rounded-lg bg-black bg-opacity-50 p-3 px- lg:p-6 mt-[80px] lg:mt-[110px] lg:w-full w-[330px]'>
          <h4 className='text-2xl lg:text-4xl font-semibold text-center'>
            If I&apos;ve got just what you need, {" "}
            <br/>
            <span className='underline decoration-[#ffffff] underline-offset-8'>Let&apos;s talk!</span> 
          </h4>

          <div className='flex items-center lg:space-x-5 space-x-3 justify-center'>
            <PhoneIcon
              className='animate-pulse h-7 w-7 text-[#ffffff]'
            />
            <p className="text-xl lg:text-2xl">{data.name}</p>
          </div>

          <div className='flex items-center lg:space-x-5 space-x-3 justify-center'>
            <EmailIcon
              className='animate-pulse h-7 w-7 text-[#ffffff]'
            />
            <p className="text-xl lg:text-2xl">{data.email}</p>
          </div>

          <div className='flex items-center lg:space-x-5 space-x-3 text-md justify-center'>
            <FmdGoodIcon
              className='animate-pulse h-7 w-7 text-[#ffffff]'
            />
            <p className="text-xl lg:text-2xl">{data.localization}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
            <div className='flex space-x-2 justify-center'>
              <input {...register('name')} type="text" placeholder='Name' className='contactInput'/>
              <input {...register('email')} type="text" placeholder='Email' className='contactInput'/>
            </div>
            <input {...register('subject')} type="text" placeholder='Subject' className='contactInput'/>
            <textarea {...register('message')} placeholder='Message' className='contactInput'/>
            <button
              type="submit"
              className='heroButton text-xl rounded-lg border-gray-500'
            >
              Submit
            </button>
          </form>
        </div>
    </motion.div>
  )
}

export default ContactMe