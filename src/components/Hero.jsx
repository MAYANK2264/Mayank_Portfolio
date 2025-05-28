import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { ParticleBackground } from "./ParticleBackground";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>
      
      <div className="absolute inset-0 max-w-7xl mx-auto flex flex-row items-start gap-5 px-6 sm:px-16 pt-32">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I'm <span className="text-[#915EFF]">Mayank</span>
          </h1>
          <p className="text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            Computer Science Student at IIIT Surat <br className="sm:block hidden" />
            Full Stack Developer & AI Enthusiast
          </p>
          <p className="text-secondary text-[17px] max-w-3xl mt-6">
            I develop modern web applications, AI-powered tools, and innovative solutions. 
            Currently focused on building responsive full-stack applications and exploring AI/ML technologies.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/MAYANK2264"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-secondary"
            >
              View Projects
            </a>
            <a
              href="mailto:kmmayank08@gmail.com"
              className="border border-white py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-white hover:text-black"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
