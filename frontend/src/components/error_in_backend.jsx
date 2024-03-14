import React from "react";
import styles from './ErrorInBackend.module.css';

function ErrorInBackend() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Error in Backend</h2>
      <p className={styles.message}>Oops! Something went wrong on the server.</p>
    </div>
  );
}

export default ErrorInBackend;
