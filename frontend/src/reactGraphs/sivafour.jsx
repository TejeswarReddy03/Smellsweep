import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import styles from './DsImageTemplate.module.css'; // Update the import path to your CSS file

function SpacingSmellGraph() {
  const { state } = useLocation();
  const metrics = state.ok;
  const [activeIndex, setActiveIndex] = useState(null);

  if (!metrics) {
    return <div>No data available</div>;
  }

  const data = Object.entries(metrics['Percentage of spacing smell per attribute']).map(([column, percentage]) => ({
    column,
    percentage,
  }));

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Percentage of Spacing Smell Per Attribute</h2>
      <div className={styles.chartContainer}>
        <BarChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="column" />
          <YAxis />
          <Tooltip />
          <Legend />
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
          Unusual patterns of spaces (leading, trailing, multiple, or missing) within data values.

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
          multiple spaces between names and extra spaces at end of names.

          </div>
        </div>
      </div>
    </div>
  );
}

export default SpacingSmellGraph;
