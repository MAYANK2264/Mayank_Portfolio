import { motion } from 'framer-motion';
import StarNavigation from '../components/StarNavigation';

const Home = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <StarNavigation />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Welcome to My <span className="text-[#915eff]">Portfolio</span>
          </h1>
          <p className="text-white-100 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            Click on a star to explore my journey
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Home; 