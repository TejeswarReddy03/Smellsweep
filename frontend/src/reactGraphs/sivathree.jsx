import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './DsImageTemplate.module.css'; // Update the import path to your CSS file

function SivaHistogram3() {
  const { state } = useLocation();
  const metrics = state.ok;
  const [activeIndex, setActiveIndex] = useState(null);

  console.log(metrics);
  if (!metrics || !metrics['Percentage of separating smell per attribute']) {
    return <div>No data smell found nothing to refactor for this smell</div>;
  }

  const separatingSmellData = metrics['Percentage of separating smell per attribute'];

  // Extracting rows with separating smell
  const rowsWithSmell = Object.entries(separatingSmellData).filter(([column, percentage]) => percentage > 0);

  if (rowsWithSmell.length === 0) {
    return <div>No rows with separating smell found</div>;
  }

  // Prepare data for the bar chart
  const dataForChart = rowsWithSmell.map(([column, percentage]) => ({
    column,
    percentage
  }));

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Rows with Separating Smell</h2>
      <div className={styles.chartContainer}>
        <BarChart width={800} height={400} data={dataForChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="column" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="percentage" fill="#8884d8" />
        </BarChart>
      </div>
      <h3>Table</h3>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Percentage of Separating Smell</th>
          </tr>
        </thead>
        <tbody>
          {rowsWithSmell.map(([column, percentage]) => (
            <tr key={column}>
              <td>{column}</td>
              <td>{percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

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
          data values contain thousands separators (such as commas or dots), creating ambiguity in how the data is interpreted

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
          value with comma as separator 1,000,000 value with dot as separator 1.000.000 ambiguity arises when there is no consistent rule or interpretation for how these separators to be used in the system, if not handled well it could lead to misinterpretation.

          </div>
        </div>
      </div>
    </div>
  );
}

export default SivaHistogram3;
