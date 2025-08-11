import React from "react";
import Tilt from "react-parallax-tilt";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <div
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={`${title} icon`}
          className='w-16 h-16 object-contain'
        />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </div>
  </Tilt>
);

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          About Me
        </h2>
        
        <div className="bg-tertiary rounded-2xl p-8 shadow-card">
          <div className="text-white">
            <p className="text-lg mb-6">
              I'm a Computer Science and Engineering student at Indian Institute of Information Technology Surat,
              passionate about building innovative solutions that make a difference. Currently pursuing my B.Tech
              (2022-2026), I specialize in full-stack development and AI/ML applications.
            </p>
            
            <p className="text-lg mb-6">
              As the Chief Executive of INDOMINUS Sports Club at IIIT Surat, I've developed strong leadership
              and organizational skills, managing large-scale events and coordinating teams of 40+ members.
            </p>

            <p className="text-lg mb-6">
              My technical expertise spans modern web technologies, AI/ML tools, and cloud platforms. I've worked
              on projects ranging from weather forecasting applications to AI assistants, always focusing on
              creating intuitive and efficient solutions.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Education</h3>
              <div className="bg-black/50 rounded-lg p-6">
                <h4 className="text-xl font-medium">Indian Institute of Information Technology Surat</h4>
                <p className="text-gray-300 mt-2">B.Tech in Computer Science and Engineering</p>
                <p className="text-gray-300">Dec 2022 - Jun 2026</p>
                <p className="text-gray-300 mt-4">
                  <span className="font-medium">Relevant Coursework:</span> Data Structures and Algorithms,
                  OS, DBMS, Software Engineering, OOP, ML, Computer Networks, System Design
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Certifications</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>AI For Everyone – Coursera (Andrew Ng)</li>
                <li>Introduction to Product Management – Udemy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
