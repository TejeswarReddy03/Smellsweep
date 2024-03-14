import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css';

function SivaHistogram1() {
  const { state } = useLocation();
  const metrics = state.ok;
  const [activeIndex, setActiveIndex] = useState(null);

  if (!metrics) {
    return <div>No data available</div>;
  }

  const dataForPlotting = Object.entries(metrics['Data type counts for plotting']).map(([column, counts]) => ({
    name: column,
    ...counts,
  }));

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Data Type Counts Image Template</h1>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <BarChart width={800} height={600} data={dataForPlotting} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
            <XAxis dataKey="name" tickLine={false} label={{ value: 'Column Name', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="int" fill="#8884d8" stackId="stack" />
            <Bar dataKey="float" fill="#82ca9d" stackId="stack" />
            <Bar dataKey="date" fill="#ffc658" stackId="stack" />
            <Bar dataKey="time" fill="#8dd1e1" stackId="stack" />
            <Bar dataKey="string" fill="#a4de6c" stackId="stack" />
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
          :Data values within the same column exhibit different data types (e.g., mixing numbers and text).


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
            here it detects the count of each data type in each column
          </div>
        </div>
      </div>
    </div>
  );
}

export default SivaHistogram1;
