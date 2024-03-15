import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import h5 from "./../../assets/h5.png";
import "./DataSections.css";

const DataSmellDetails = ({ imageUrls, description,metrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  // Function to navigate to "/datasmell_img_template"
  const navigateToTemplate = () => {
    navigate('/datasmell_img_template', { state: { metrics: metrics } });
  };

  return (
    <div className='flee'>
      <div className="data-smell-details">
        <div className="image-slider">
          <img src={imageUrls[currentIndex]} alt="Data Smell" className="current-image" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
          <br/>
          {imageUrls.length > 1 && (
            <div className="slider-controls">
              <button type="button" className="btn btn-primary rounded-pill" onClick={handlePrev}>
                <span className="mr-2">&#9664;</span>
              </button>
              <button type="button" className="btn btn-primary rounded-pill mr-2" onClick={handleNext}>
                <span className="ml-2">&#9654;</span>
              </button>
            </div>
          )}
        </div>
        <div className="description-container">
          <h3>Data Smell Description</h3>
          <p>
            <ul>
              <li><h3>first metric</h3> </li>
              <li><h3>second metric</h3> </li>
              <li><h3>third metric</h3> </li>
            </ul>
          </p>
          {/* Button to navigate to "/datasmell_img_template" */}
          <button className="btn btn-primary" onClick={navigateToTemplate}>Go to Template</button>
        </div>
      </div>
    </div>
  );
};

export default DataSmellDetails;
