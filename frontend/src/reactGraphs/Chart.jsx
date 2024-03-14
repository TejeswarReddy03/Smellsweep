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
      This data smell refers to the presence of data points that fall significantly outside the expected range of the majority of data (i.e., outliers). This can skew the overall distribution and distort the representation of the data.

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
      Impact: Outliers can significantly impact the results of statistical analysis, leading to misleading conclusions. They can also mask underlying patterns in the data.

      </div>
    </div>
  </div>
</div >
  </>
  );
}

export default MyHistogram4;
