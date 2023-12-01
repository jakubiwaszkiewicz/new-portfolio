import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  defer,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Portfolio from "./pages/Portfolio";
import bgImage from "./assets/bg.png";
import Project from "./pages/Project";
import FooterAlt from "./components/FooterAlt";

// data for tests
const API_EXP_URL = process.env.REACT_APP_API_URL_EXP;
const API_ABOUT_URL = process.env.REACT_APP_API_URL_ABOUT;
const API_PROJECTS_URL = process.env.REACT_APP_API_URL_PROJECTS;
const API_TOKEN = process.env.REACT_APP_API_KEY;

const classNameString = `
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
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={classNameString} style={appStyles}>
      <Header />
      <Outlet />
      {isHome ? <FooterAlt /> : <Footer />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async ({ request, params }) => {
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

          // check if data is ok
          if (!aboutData.ok) throw new Error(await aboutData.text());
          if (!expData.ok) throw new Error(await expData.text());

          // parse data
          aboutData = await aboutData.json();
          expData = await expData.json();

          // load images
          await expData.data.forEach(async (project) => {
            project.loadedImages = [];
            for (let image of project.image) {
              let loadedImage = await fetch(
                `https://api.flotiq.com${image.dataUrl}`,
                {
                  headers: {
                    "X-Auth-Token": API_TOKEN,
                  },
                }
              );
              let loadedImageData = await loadedImage.json();
              project.loadedImages.push(loadedImageData.url);
            }
          });

          aboutData.data[0].loadedImages = [];
          for (let image of aboutData.data[0].photos) {
            let loadedImage = await fetch(
              `https://api.flotiq.com${image.dataUrl}`,
              {
                headers: {
                  "X-Auth-Token": API_TOKEN,
                },
              }
            );
            let loadedImageData = await loadedImage.json();
            aboutData.data[0].loadedImages.push(loadedImageData.url);
          }

          return defer({
            results: { aboutData, expData },
          });
        },
      },
      {
        path: "/projects",
        element: <Portfolio />,
        loader: async ({ request, params }) => {
          let dataProjects = await fetch(API_PROJECTS_URL, {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          });

          if (!dataProjects.ok) throw new Error(await dataProjects.text());
          dataProjects = await dataProjects.json();

          await dataProjects.data.forEach(async (project) => {
            project.loadedImages = [];
            for (let image of project.image) {
              let loadedImage = await fetch(
                `https://api.flotiq.com${image.dataUrl}`,
                {
                  headers: {
                    "X-Auth-Token": API_TOKEN,
                  },
                }
              );
              let loadedImageData = await loadedImage.json();
              project.loadedImages.push(loadedImageData.url);
            }
          });

          return defer({
            results: { dataProjects },
          });
        },
      },
      {
        path: "/project/:id",
        element: <Project />,
        loader: async ({ request, params }) => {
          let dataProjects = await fetch(API_PROJECTS_URL, {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          });
          if (!dataProjects.ok) throw new Error(await dataProjects.text());
          dataProjects = await dataProjects.json();

          await dataProjects.data.forEach(async (project) => {
            project.loadedImages = [];
            for (let image of project.image) {
              while (!image.dataUrl) {
                let loadedImage = await fetch(
                  `https://api.flotiq.com${image.dataUrl}`,
                  {
                    headers: {
                      "X-Auth-Token": API_TOKEN,
                    },
                  }
                );
                let loadedImageData = await loadedImage.json();
                project.loadedImages.push(loadedImageData.url);
              }
            }
          });

          return defer({
            results: { dataProjects },
          });
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
