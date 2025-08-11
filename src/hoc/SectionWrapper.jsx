import { styles } from "../styles";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </section>
    );
  };

export default StarWrapper;
 