import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css'; // Update the import path to your CSS file

function SivaHistogram5() {
  const { state } = useLocation();
  const metrics = state.ok;
  const [activeIndex, setActiveIndex] = useState(null);

  if (!metrics || !metrics['Special Characters Inconsistency Detected']) {
    return <div>No data found</div>;
  }

  const affectedColumns = metrics['Affected Columns'];

  const data = Object.keys(affectedColumns).map(column => ({
    column,
    count: Object.values(affectedColumns[column]).reduce((a, b) => a + b),
  }));

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Special Characters Inconsistency Detected</h2>
      <div className={styles.chartContainer}>
        <BarChart width={800} height={300} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
          <XAxis dataKey="column" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
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
          Data values containing special characters beyond alphanumeric characters.
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
          Insome cases name entries may have special charactersor the column for the amount has special characters which may not lead to perform actions on those so these need to be removed
          </div>
        </div>
      </div>
    </div>
  );
}

export default SivaHistogram5;
