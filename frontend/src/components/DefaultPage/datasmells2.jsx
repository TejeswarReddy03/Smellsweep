import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import emptystring from './../../assets/emptystring.jpg'
import outlier from './../../assets/outlier.jpg';
import unnecessarychar from './../../assets/unnecessarycharacters.jpg';
import datetime from './../../assets/datestring.png';
import intstring from './../../assets/intasstring.png';
import floatstring from './../../assets/floatasstring.png';
import intfloat from './../../assets/intasfloat.png';
import specialchar from './../../assets/specialchar.png';
import spacingsmell from './../../assets/spacingsmell.png';
import seperatingsmell from './../../assets/seperatingsmell.png';
import inconsistent from './../../assets/inconsistent.png';
import unit from './../../assets/unit.png';
import mi from './../../assets/mi.png';
import './styles.css';

const SvgComponent = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const dataa = state.ok;
  // console.log(passedData,"hiii");
  const circleImagePaths = [intfloat, specialchar, spacingsmell, seperatingsmell, inconsistent, unit, mi]; // Circle image paths
  const squareImagePaths = [emptystring, outlier, unnecessarychar, datetime, intstring, floatstring]; // Square image paths
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

  const handleClick = () => {
    // Navigate to the desired page
    navigate("/datasmells",{state:{ok:dataa}})
  };
  const customTranslations = [10, 10, 10, 5, -30, -70, -10];
  const translations = [5, 5, 5, 5, 5, 5];

  const handlePieceClick = (index) => {
    if(index+1==1){
      navigate('/charts1',{state:{ok:dataa["metrics"]["empty_strings"]}});
    }
    else if(index+1==2){
      navigate('/charts',{state:{ok:dataa["metrics"]["outliers"][0],ok2:dataa["metrics"]["outliers"][1]}});
    }
    else if(index+1==3){
      navigate('/charts3',{state:{ok:dataa["metrics"]["unnecessary_char"][0],ok2:dataa["metrics"]["unnecessary_char"][1]}});
    }
    else if(index+1==4){
      const metricsdatetimesmell = dataa.metrics.date_time_smell;
      navigate('/manoj1', { state: { ok: metricsdatetimesmell } });
      // navigate('/charts4',{state:{ok:dataa["metrics"]["date_time_smell"]}});
    }
    else if(index+1==5){
      const metricintasstring=dataa.metrics.integer_as_string;
      navigate('/manoj2', { state: { ok: metricintasstring } });
      
      
      // navigate('/charts4',{state:{ok:dataa["metrics"]["integer_as_string"]}});
    }
    else if(index+1==6){
      const metricfloatasstring=dataa.metrics.float_as_string;
      navigate('/manoj3', { state: { ok: metricfloatasstring } });

      // navigate('/charts5',{state:{ok:dataa["metrics"]["float_as_string"]}});
    }
    else if(index+1==7){
      console.log("in datasmells2");
      console.log(dataa.metrics);
      console.log(dataa.metrics.integer_as_float)
      const metricintasfloat=dataa.metrics.integer_as_float;
      navigate('/manoj4', { state: { ok: dataa.metrics.integer_as_float } });

      // navigate('/charts7',{state:{ok:dataa["metrics"]["integer_as_float"]}});
    }
    else if(index+1==8){
      navigate('/siva5',{state:{ok:dataa["metrics"]["specialchar"]}});
    }
    else if(index+1==9){
      navigate('/siva4',{state:{ok:dataa["metrics"]["spacingsmell"]}});
    }
    else if(index+1==10){
      navigate('/siva3',{state:{ok:dataa["metrics"]["seperatingsmell"]}});
    }
    else if(index+1==11){
      navigate('/siva1',{state:{ok:dataa["metrics"]["inconsistent"]}});
    }
    else if(index+1==12){
      navigate('/siva6',{state:{ok:dataa["metrics"]["unitinconsistency"]}});
    }
    else if(index+1==13){
      navigate('/siva2',{state:{ok:dataa["metrics"]["minconsistency"]}});
    }




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
      <button onClick={handleClick}>DataSmells2/2</button>
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
