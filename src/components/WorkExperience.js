import React from "react";
import ExpCard from "./ExpCard";
function WorkExperience({ expData }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <div>
      <div
        className="
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
                z-0"
      >
        <h1 className="sectionTitle">&nbsp;Experience</h1>
        <div
          className="
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
                        mt-10"
        >
          {expData.data.map((project) => (
            <ExpCard
              key={project.id || ""}
              img={`${API_BASE_URL}${project.loadedImages[0]}` || ""}
              title={project.title || ""}
              date={project.date || ""}
              list={project.list || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkExperience;
