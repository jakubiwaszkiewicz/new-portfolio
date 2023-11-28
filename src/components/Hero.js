import React from 'react';
import BackgroundCircles from './BackgroundCircles';
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useRef } from 'react';

function Hero({ photo, name }) {

  const [text, count] = useTypewriter({
    words:[
        `Hi, My Name's Jakub!`,
        "ICT-student.tsx",
        "CantWorkWithout: \"Coffee\"",
        "<fall_in_love_with_web-dev />",
        ],
    loop: true,
    delaySpeed: 2000,
});

    const windowWidth = useRef(window.innerWidth);
    return (
      <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <BackgroundCircles />
          <img
          src={photo}
          className='relative rounded-full h-40 w-40 mx-auto object-cover'
          alt=''
          />
        <div className='z-20'>
        <h2 className='
            text-4xl
            font-light
            pb-5
          '>
            {name}
          </h2>
          {windowWidth.current > 768 ? <h2 className=' text-sm uppercase pb-2 tracking-[15px]'>Web Developer</h2> : <h2 className=' text-sm uppercase pb-2 tracking-[15px]'>Web Developer</h2> }
          
          <h1 className='text-5xl lg:text-6xl font-semibold px-10'>
            <span className='text-white z-10'>{text}</span>
            <Cursor cursorColor="#ffffff"/>
          </h1>

          {/* <h1 className='text-5xl lg:text-6xl font-semibold px-10'>
            <span className='text-white z-10'>{text}</span>
            <Cursor cursorColor="white"/>
          </h1> */}
          <div className='pt-5'>
            <a href="#about">
              <button className='heroButton'>About</button>
            </a>
            <a href="#experience">
              <button className='heroButton'>Experience</button>
            </a>
            <a href="#projects">
              <button className='heroButton'>Projects</button>
            </a>
          </div>
        </div>
      </div>
    );
}

export default Hero;