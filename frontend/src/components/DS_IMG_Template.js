// DSIMGTemplate.js
import React, { useState } from 'react';
import styles from './DSIMGTemplate.module.css';
import IntegerAsFloatChart from './DefaultPage/thirdsection/int_as_float';
import IntegerAsStringChart from './DefaultPage/thirdsection/integer_as_string';
import FloatAsStringChart from './DefaultPage/thirdsection/float_as_string';
import Datetimefun from './DefaultPage/thirdsection/datetime';
import { useLocation } from 'react-router-dom';
function DataSmellsImageTemplate() {
  const location = useLocation();
  const { metrics } = location.state;
console.log("in dsimg template");
console.log(metrics);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  // console.log("hi")
  // console.log(metrics.date_time_smell);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Data Smells Image Template</h1>
      <div className={styles.chartContainer}> {/* Wrapper div for the chart */}
        <div className={styles.chartWrapper}>
         
          <Datetimefun obj={metrics.date_time_smell} />
        </div>
      </div>
     
      <div className={styles.accordion}>
        <div className={styles.accordionItem}>
          <div
            className={`${styles.accordionHeader} ${activeIndex === 0 ? styles.active : ''}`}
            onClick={() => handleAccordionClick(0)}
          >
            <span>Accordion Item #1</span>
            <span className={styles.dropdownIcon}>{activeIndex === 0 ? '▲' : '▼'}</span>
          </div>
          <div className={`${styles.accordionContent} ${activeIndex === 0 ? styles.activeContent : styles.inactiveContent}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
        </div>
        <div className={styles.accordionItem}>
          <div
            className={`${styles.accordionHeader} ${activeIndex === 1 ? styles.active : ''}`}
            onClick={() => handleAccordionClick(1)}
          >
            <span>Accordion Item #2</span>
            <span className={styles.dropdownIcon}>{activeIndex === 1 ? '▲' : '▼'}</span>
          </div>
          <div className={`${styles.accordionContent} ${activeIndex === 1 ? styles.activeContent : styles.inactiveContent}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataSmellsImageTemplate;
