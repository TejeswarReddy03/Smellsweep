import React,{useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css';

function MyHistogram2() {
  const { state } = useLocation();
//   console.log(state.ok);
  const dummy1 = state.ok;
  const data = Object.entries(dummy1).map(([name, count]) => ({ name, count }));
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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
      Placeholder values used to represent missing data without proper indication. These values can mislead analysis if not identified and handled appropriately.

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
      In some cases, dummy values may be mistaken for actual data, leading to misinterpretation of the dataset. For example, if dummy values are not clearly documented or differentiated from actual data values, they may inadvertently influence analysis results or decision-making processes.
      </div>
    </div>
  </div>
  </div>
    </>
  );
}

export default MyHistogram2;
