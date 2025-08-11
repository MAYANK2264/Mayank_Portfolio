import StarNavigation from '../components/StarNavigation';
import GalaxyBackground from '../components/GalaxyBackground';

const Home = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Full-screen Galaxy Background Canvas */}
      <GalaxyBackground />
      
      <StarNavigation />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Welcome to My <span className="text-[#915eff]">Portfolio</span>
          </h1>
          <p className="text-white-100 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            Click on a star to explore my journey
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home; 