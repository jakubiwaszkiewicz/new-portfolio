import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  defer,
  useLocation
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import bgImage from './assets/bg.png';
import Project from './pages/Project';
import FooterAlt from './components/FooterAlt';

// data for tests 

const API_EXP_URL = `${process.env.REACT_APP_API_URL_EXP}?populate=*`;
const API_ABOUT_URL = `${process.env.REACT_APP_API_URL_ABOUT}?populate=*`;
const API_ABOUT_PROJECTS = `${process.env.REACT_APP_API_URL_PROJECTS}?populate=*`;

const classNameString =`
    text-white
    h-screen
    snap-y
    overflow-y-scroll
    overflow-x-hidden
    snap-mandatory
    z-0 scrollbar
    scrollbar-track-gray-400/20
    scrollbar-thumb-[#ffffff]/80
    scroll-smooth
  `;

  const appStyles = {
    background: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

const Layout = () => {

  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className={classNameString} style={appStyles}>
      <Header/>
      <Outlet/>
      {isHome ? <FooterAlt/> : <Footer/> }
    </div> 
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        loader: async ({ request, params }) => {
          let aboutDataAPI = await fetch(API_ABOUT_URL)
          let expDataAPI = await fetch(API_EXP_URL)
          if (!aboutDataAPI.ok) throw new Error(await aboutDataAPI.text())
          if (!expDataAPI.ok) throw new Error(await expDataAPI.text())
          aboutDataAPI = await aboutDataAPI.json()
          expDataAPI = await expDataAPI.json()
          return defer({
            results: {aboutDataAPI, expDataAPI}
          })
        }
      },
      {
        path: "/projects",
        element: <Portfolio/>,
        loader: async ({ request, params }) => {
          let dataProjectsAPI = await fetch(API_ABOUT_PROJECTS)
          if (!dataProjectsAPI.ok) throw new Error(await dataProjectsAPI.text())
          dataProjectsAPI = await dataProjectsAPI.json()
          return defer({
            results: {dataProjectsAPI}
          })
        }
      },
      {
        path: "/project/:id",
        element: <Project/>,
        loader: async ({ request, params }) => {
          let dataProjectsAPI = await fetch(API_ABOUT_PROJECTS)
          if (!dataProjectsAPI.ok) throw new Error(await dataProjectsAPI.text())
          dataProjectsAPI = await dataProjectsAPI.json()
          return defer({
            results: {dataProjectsAPI}
          })
        }
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

