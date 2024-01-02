import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import { AiOutlineArrowUp } from "react-icons/ai";

import { useLoaderData } from "react-router-dom";

import { useState, useEffect } from "react";

import { getAboutData, getExpData } from "../utils/getData";

const API_EXP_URL = process.env.REACT_APP_API_URL_EXP;
const API_ABOUT_URL = process.env.REACT_APP_API_URL_ABOUT;
const API_PROJECTS_URL = process.env.REACT_APP_API_URL_PROJECTS;
const API_TOKEN = process.env.REACT_APP_API_KEY;

export default function Home() {
  const { aboutData, expData } = useLoaderData().results;

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

      {/* About */}
      <section id="about" className="snap-center">
        <About
          photo={`https://api.flotiq.com${
            aboutData.data[0].loadedImages[0] ?? ""
          }`}
          desc={aboutData.data[0].description ?? ""}
        />
      </section>

      {/* Experience */}
      <section id="experience" className="snap-center">
        <WorkExperience expData={expData} />
      </section>

      {/* Projects */}
      <section id="projects" className="snap-start">
        <Projects />
      </section>

      {/* Contact Me */}
      <section id="contact" className="snap-start">
        <ContactMe data={aboutData.data[0] ? aboutData.data[0] : ""} />
      </section>

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

// loader

export async function loader() {
  // fetch data from API
  let aboutData = await fetch(API_ABOUT_URL, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  });

  let expData = await fetch(API_EXP_URL, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  });

  if (!aboutData.ok || !expData.ok) {
    throw new Error(`Error! status: ${aboutData.status} || ${expData.status}`);
  }
  // parse data
  aboutData = await aboutData.json();
  expData = await expData.json();

  aboutData.data[0].loadedImages = [];
  for (let image of aboutData.data[0].photos) {
    let loadedImage = await fetch(`https://api.flotiq.com${image.dataUrl}`, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });
    let loadedImageData = await loadedImage.json();
    aboutData.data[0].loadedImages.push(loadedImageData.url);
  }

  for (let experience of expData.data) {
    experience.loadedImages = [];
    for (let image of experience.image) {
      let loadedImage = await fetch(`https://api.flotiq.com${image.dataUrl}`, {
        headers: {
          "X-Auth-Token": API_TOKEN,
        },
      });
      let loadedImageData = await loadedImage.json();
      experience.loadedImages.push(loadedImageData.url);
    }
  }
  return {
    results: { aboutData, expData },
  };
}
