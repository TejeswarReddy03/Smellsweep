import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DsImageTemplate.module.css';

function Charts_empty() {
    const { state } = useLocation();
    const dummy1 = state.ok;
    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };
  return (
    <>

        
            <div style={{ color: 'blue', fontSize: '18px', marginBottom: '20px' }}>
                <b>Total Number of Empty Strings are : {dummy1}</b>
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
       Empty strings ("") or specific characters representing missing data can arise in datasets due to various reasons.

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
       Examples: In a customer database, some email addresses might be empty for individuals who haven't provided them. A survey might have optional questions, resulting in empty responses for those who didn't answer them. Data transfer limitations might lead to missing information in certain columns.

       </div>
     </div>
   </div>
   </>
  )
}

export default Charts_empty
