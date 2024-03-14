import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css'; // Update the import path to your CSS file

function SivaHistogram2() {
  const { state } = useLocation();
  const metrics = state.ok;
  const [activeIndex, setActiveIndex] = useState(null);

  if (!metrics) {
    return <div>No data available</div>;
  }

  // Extracting data for plotting
  const inconsistencyData = Object.entries(metrics['Percentage of missing value inconsistency per attribute']).map(([column, percentage]) => ({ column, percentage }));
  const typePercentageData = Object.entries(metrics['Percentage of each type of missing value']).map(([column, types]) => ({
    column,
    'NaN': types['NaN'] || 0,
    'N/A': types['N/A'] || 0,
    'unknown': types['unknown'] || 0,
    'missing': types['missing'] || 0,
    'null': types['null'] || 0,
    'Unknown': types['Unknown'] || 0,
  }));

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Percentage of Missing Value Inconsistency in Each Column</h2>
      <BarChart width={800} height={300} data={inconsistencyData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
        <XAxis dataKey="column" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="percentage" fill="#8884d8" />
      </BarChart>

      <h2>Percentage of Each Type of Missing Value in Each Column</h2>
      <BarChart width={800} height={300} data={typePercentageData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
        <XAxis dataKey="column" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="NaN" stackId="a" fill="#8884d8" />
        <Bar dataKey="N/A" stackId="a" fill="#82ca9d" />
        <Bar dataKey="unknown" stackId="a" fill="#ffc658" />
        <Bar dataKey="missing" stackId="a" fill="#ff7300" />
        <Bar dataKey="null" stackId="a" fill="#ff0000" />
        <Bar dataKey="Unknown" stackId="a" fill="#00ff00" />
      </BarChart>

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
          Inconsistent ways of handling missing values within the same dataset.
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
          Suppose you have a dataset representing employee information, and missing values are represented differently Employee A 'Not available' Employee B 'N/A' Employee C 'Unknown' Employee D '' In this example, there's inconsistency in how missing values are represented
          </div>
        </div>
      </div>
    </div>
  );
}

export default SivaHistogram2;
