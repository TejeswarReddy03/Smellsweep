import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css'; // Update the import path to your CSS file

function UnitInconsistencyGraph() {
  const { state } = useLocation();
  const metrics = state.ok;
  const [activeIndex, setActiveIndex] = useState(null);

  if (!metrics || !metrics['Percentage of unit inconsistency per attribute']) {
    return <div>No data found</div>;
  }

  const dataForPlotting = Object.entries(metrics['Percentage of unit inconsistency per attribute']).map(([column, percentage]) => ({
    column,
    percentage,
  }));

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Percentage of Unit Inconsistency in Each Column</h2>
      <div className={styles.chartContainer}>
        <BarChart width={800} height={300} data={dataForPlotting} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
          <XAxis dataKey="column" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="percentage" fill="#8884d8" />
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
          Different units used to represent the same measurement
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
            units are not same
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitInconsistencyGraph;
