import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import h5 from "./../../assets/h5.png";
import mka from "./../../assets/mka.png";
import missing from './../../assets/missing.png';
import duplicate from "./../../assets/Duplicatevalue.png";
import extreme from "./../../assets/extremevalue.jpeg";
import misspelling from './../../assets/misspelling.png';
import suspectclass from './../../assets/suspectclass.png';
import casing from './../../assets/casing.png';
import longdata from './../../assets/longdatavalue.png';
import './styles.css';

const SvgComponent = () => {
  const navigate = useNavigate();
  const circleImagePaths = [longdata, mka, h5, mka, h5, longdata, h5]; // Circle image paths
  const squareImagePaths = [missing, duplicate, extreme, misspelling, suspectclass, casing]; // Square image paths
  const [hoveredSquareIndex, setHoveredSquareIndex] = useState(null);
  const [hoveredCircleIndex, setHoveredCircleIndex] = useState(null);

  const generatePatternId = (index) => `pattern${index + 1}`;

  const generatePathData = (startAngle, endAngle) => {
    const radius = 275;
    const startX = 400 + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = 400 + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = 400 + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = 400 + radius * Math.sin((endAngle * Math.PI) / 180);

    return `M 400 400 L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`;
  };

  const customTranslations = [10, 10, 10, 5, -30, -70, -10];
  const translations = [5, 5, 5, 5, 5, 5];

  const handlePieceClick = (index) => {
    navigate('/');
    console.log(`Piece ${index + 1} clicked`);
  };

  const patterns = circleImagePaths.map((imagePath, index) => (
    <pattern
      key={index}
      id={generatePatternId(index)}
      patternUnits="userSpaceOnUse"
      width="100%"
      height="100%"
    >
      <image
        href={imagePath}
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      />
    </pattern>
  ));

  const squareSize = '63%'; // Adjusted square size

  const squares = squareImagePaths.map((imagePath, index) => {
    const isHovered = hoveredSquareIndex === index;

    return (
      <image
        key={index}
        width={squareSize}
        height={squareSize}
        href={imagePath}
        onClick={() => handlePieceClick(index)} // Add onClick handler
        onMouseEnter={() => setHoveredSquareIndex(index)}
        onMouseLeave={() => setHoveredSquareIndex(null)}
        style={{
          transition: 'transform 0.5s ease-in-out, stroke-width 0.3s ease-in-out',
          transform: isHovered ? `scale(1.1) translateZ(${translations[index]}px)` : '',
          strokeWidth: isHovered ? 5 : 0,
        }}
      />
    );
  });

  const paths = circleImagePaths.map((_, index) => {
    const startAngle = (index * 360) / 7;
    const endAngle = ((index + 1) * 360) / 7;
    const isHovered = hoveredCircleIndex === index;

    return (
      <path
        key={index}
        fill={`url(#${generatePatternId(index)})`}
        d={generatePathData(startAngle, endAngle)}
        onClick={() => handlePieceClick(index + 6)} // Add onClick handler for circles
        onMouseEnter={() => setHoveredCircleIndex(index)}
        onMouseLeave={() => setHoveredCircleIndex(null)}
        style={{
          transition: 'transform 0.5s ease-in-out, stroke-width 0.3s ease-in-out',
          transform: isHovered ? `scale(1.1) translateX(${customTranslations[index]}px)` : '',
          strokeWidth: isHovered ? 5 : 0,
        }}
      ></path>
    );
  });

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
          {patterns}
          <g transform="translate(120, -320)">
            {squares.slice(0, 3).map((square, index) => (
              <g key={index} transform={`translate(0, ${index * 120})`}> {/* Adjust translateY and add margin */}
                <g transform={`translate(0, ${index * 380})`}>{square}</g> {/* Add margin */}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/datasmells"><button style={{ padding: '10px 20px', fontSize: '1.2rem', borderRadius: '5px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }}> {/* Adjusted button size and style */}
            Smellsweep2/2
          </button></Link> {/* Button to navigate */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 750 750" width="100%" height="100%">
          {paths}
          {circleImagePaths.map((_, index) => (
            <text key={index}>
              <textPath startOffset="50%" xlinkHref={`#btn${index + 1}`}>
                Section {index + 1}
              </textPath>
            </text>
          ))}
        </svg>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
          {patterns}
          <g transform="translate(100, -320)">
            {squares.slice(3).map((square, index) => (
              <g key={index} transform={`translate(0, ${index * 120})`}> {/* Adjust translateY and add margin */}
                <g transform={`translate(0, ${index * 380})`}>{square}</g> {/* Add margin */}
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
  
  
};

export default SvgComponent;
