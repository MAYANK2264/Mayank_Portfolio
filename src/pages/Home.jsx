import SimpleStarNavigation from '../components/SimpleStarNavigation';
import SpaceEnvironment from '../components/SpaceEnvironment';

const Home = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Galaxy Background - base layer */}
      <SpaceEnvironment />
      
      {/* Simple Star Navigation with Welcome Text */}
      <SimpleStarNavigation />
    </section>
  );
};

export default Home; 