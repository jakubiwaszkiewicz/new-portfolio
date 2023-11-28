import Hero from '../components/Hero';
import About from '../components/About'; 
import WorkExperience from '../components/WorkExperience';
import Projects from '../components/Projects';
import ContactMe from '../components/ContactMe';
import { AiOutlineArrowUp } from 'react-icons/ai';

import { useLoaderData } from 'react-router-dom';
/*
const Hero =  lazy(() => import('../components/Hero'));
const About =  lazy(() => import('../components/About'));
const WorkExperience =  lazy(() => import('../components/WorkExperience'));
const Projects =  lazy(() => import('../components/Projects'));
const ContactMe =  lazy(() => import('../components/ContactMe'));
*/

const API_URL = process.env.REACT_APP_API_URL;
function Home() {

  const { aboutDataAPI, expDataAPI } = useLoaderData().results;

  return (
    <div>
        {/*
          loadingAPI.some((element) => element === true ) && <Loading />
        */}
        <section id="hero" className="snap-start">
          <Hero
            photo={`${API_URL}${aboutDataAPI.data.attributes.photos.data[0].attributes.formats.large.url}`}
            name={aboutDataAPI.data.attributes.name}
          />
        </section>

        {/* {About} */}
        <section id="about" className="snap-center">
          <About
            photo={`${API_URL}${aboutDataAPI.data.attributes.photos.data[0].attributes.formats.large.url}`}
            desc={aboutDataAPI.data.attributes.description}
          />
        </section>

        {/* {Experience} */}
        <section id="experience" className="snap-center">
          <WorkExperience
            expDataAPI={expDataAPI}
          />
        </section>

        {/* {Projects} */}
        <section id="projects" className="snap-start">
          <Projects/>
        </section>

        {/* {Contact Me} */}
        <section id="contact" className="snap-start">
          <ContactMe
            data = {aboutDataAPI.data.attributes ? aboutDataAPI.data.attributes : ''}
          />
        </section>
        
        <div className="sticky bottom-5 w-full">
          <div className="flex items-center justify-end mr-10">
            <a href="#hero" className='cursor-pointer'>
              <AiOutlineArrowUp
                className="w-10 h-10 filter hover:text-[#D71E75] transtion-hover duration-300"
              />
            </a>
          </div>
        </div>
    </div>
  );
}

export default Home;
