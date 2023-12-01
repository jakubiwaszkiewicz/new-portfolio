import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import { AiOutlineArrowUp } from "react-icons/ai";

import { useLoaderData } from "react-router-dom";

import { useState, useEffect } from "react";

const API_EXP_URL = process.env.REACT_APP_API_URL_EXP;
const API_ABOUT_URL = process.env.REACT_APP_API_URL_ABOUT;
const API_PROJECTS_URL = process.env.REACT_APP_API_URL_PROJECTS;
const API_TOKEN = process.env.REACT_APP_API_KEY;

function Home() {
  const { aboutData, expData } = useLoaderData().results;

  console.log(aboutData);
  console.log(expData);
  return (
    <div>
      <section id="hero" className="snap-start">
        <Hero
          photo={
            `https://api.flotiq.com${aboutData.data[0].loadedImages[0]}`
              ? `https://api.flotiq.com${aboutData.data[0].loadedImages[0]}`
              : ""
          }
          name={aboutData.name}
        />
      </section>

      {/* {About} */}
      {/* <section id="about" className="snap-center">
        <About
          photo={`https://api.flotiq.com${
            aboutData.data[0].loadedImages[0] ?? ""
          }`}
          desc={aboutData.description}
        />
      </section> */}

      {/* {Experience} */}
      {/* <section id="experience" className="snap-center">
        <WorkExperience expDataAPI={expData} />
      </section>

      {/* {Projects} */}
      {/* <section id="projects" className="snap-start">
        <Projects />
      </section>

      {/* {Contact Me} */}
      {/*<section id="contact" className="snap-start">
        <ContactMe data={expData.data[0] ? expData.data[0] : ""} />
      </section> */}

      <div className="sticky bottom-5 w-full">
        <div className="flex items-center justify-end mr-10">
          <a href="#hero" className="cursor-pointer">
            <AiOutlineArrowUp className="w-10 h-10 filter hover:text-[#D71E75] transtion-hover duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
