import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Header() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Stagger the animations for each icon
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: 'spring', // Add a spring animation
        damping: 8, // Adjust damping for bounce effect
        stiffness: 100, // Adjust stiffness for bounce effect
      },
    },
  };

  const animationSettings = {
    duration: 0.5,
  };

  return (
    <motion.header
      className="bg-opacity-0 sticky top-0 flex flex-row items-start max-w-7xl mx-auto z-20 xl:items-center p-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={iconVariants}
        transition={animationSettings}
        className="flex flex-row items-center flex-1 mr-auto justify-start"
      >
        <a href="https://github.com/jakubiwaszkiewicz">
          <GitHubIcon className="cursor-pointer mx-2" style={{ height: 36, width: 36 }} />
        </a>
      </motion.div>
      <motion.div
        variants={iconVariants}
        transition={animationSettings}
        className="flex flex-row items-center mx-12"
      >
        <Link to="/">
          <HomeOutlinedIcon style={{ height: 50, width: 50 }} className="cursor-pointer" />
        </Link>
      </motion.div>
      <motion.div
        variants={iconVariants}
        transition={animationSettings}
        className="flex flex-row items-center flex-1 ml-auto justify-end"
      >
        <a href="https://www.linkedin.com/in/jakub-iwaszkiewicz-635bb4245/">
          <LinkedInIcon className="cursor-pointer mx-2" style={{ height: 40, width: 40 }} />
        </a>
      </motion.div>
    </motion.header>
  );
}

export default Header;
