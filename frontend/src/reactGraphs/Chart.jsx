import React , { useState }from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css';


function MyHistogram4() {
  const { state } = useLocation();
  const dummy1 = state.ok;
  const dummy2 = state.ok2;
  console.log(dummy1, dummy2);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  // Assuming dummy1 and dummy2 are arrays of names and counts
  const data = dummy1.map((name, index) => ({
    name,
    count: dummy2[index],
  }));

  return (
    <>
     <div className={styles.container}>

<h1 className={styles.heading}>Data Smells Image Template</h1>
<div className={styles.chartContainer}> 
<div className={styles.chartWrapper}>
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Names', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>

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


  </>
  );
}

export default MyHistogram4;
