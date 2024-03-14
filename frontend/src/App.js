/**
 * @Date:  2023-02-28
 * @Language: React.js
 * @Description: App.js- This file is the key component of the frontend. It contains the navigation bar and the main page.
 */

import React from "react";
// import { useState } from "react";
// import axios from "axios";
import "./App.css"
import MainPage from "./components/DefaultPage/Mainpage";
import DataSmells from "./components/DefaultPage/datasmells";

// import DataSmellsImageTemplate from "./components/DS_IMG_Template";
import ErrorInBackend from "./components/error_in_backend";
import Appp from "./test";

import DataSmells2 from "./components/DefaultPage/datasmells2";
import DataSmellsImageTemplate from "./components/DsImageTemplate";

// import IntegerAsStringChart from "./reactGraphs/Chart";

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter ,Route,Routes,Navigate } from 'react-router-dom';
import MyHistogram from "./reactGraphs/sus_sign_charts";
import MyHistogram2 from "./reactGraphs/charts_dummyValues";
import MyHistogram3 from "./reactGraphs/unnecessary_char_graph";
import SivaHistogram1 from "./reactGraphs/sivaone";
import SivaHistogram2 from "./reactGraphs/sivatwo";
import SivaHistogram3 from "./reactGraphs/sivathree";
import SivaHistogram4 from "./reactGraphs/sivafour";
import SivaHistogram5 from "./reactGraphs/sivafive";
import SivaHistogram6 from "./reactGraphs/sivasix";

import MyHistogram40 from "./reactGraphs/Charts_empty"
import MyHistogram4 from "./reactGraphs/Chart";
import MyHistogram5 from "./reactGraphs/suspect_detection_chart";
import MyHistogram6 from "./reactGraphs/contracting_charts";
import Charts_empty from "./reactGraphs/Charts_empty";
// import IntegerAsStringChart from './reactGraphs/Chart';

// @Description: This function returns the key components of the frontend.

function App() {
  
  return (
    <>
    <div className="total-main">
      <BrowserRouter>
        <Routes>
        {<Route index element ={<MainPage />} />}
      {<Route path='/datasmells'  element={< DataSmells/>} />}

      {<Route path='/datasmell_img_template'  element={< DataSmellsImageTemplate/>} />}
      


      {<Route path='/datasmells2'  element={< DataSmells2/>} />}

      {<Route path='/datasmells'  element={< DataSmells />} />}
      {<Route path='/charts'  element={< MyHistogram4 />} />}

      {<Route path='/charts2'  element={< MyHistogram2 />} />}
      {<Route path='/charts3'  element={< MyHistogram3 />} />}
      {<Route path='/siva1' element={<SivaHistogram1/>}/>}
      {<Route path='/siva2' element={<SivaHistogram2/>}/>}
      {<Route path='/siva3' element={<SivaHistogram3/>}/>}
      {<Route path='/siva4' element={<SivaHistogram4/>}/>}
      {<Route path='/siva5' element={<SivaHistogram5/>}/>}
      {<Route path='/siva6' element={<SivaHistogram6/>}/>}
//       {<Route path='/sus_sign_charts'  element={< MyHistogram4 />} />}
      {<Route path='/charts4'  element={< MyHistogram40 />} />}
      {/* Charts_empty */}

      
      {<Route path='/sus_sign_charts'  element={< MyHistogram/>} />}
      {<Route path='/suspect_detection_charts'  element={< MyHistogram5 />} />}
      {<Route path='/contracting_charts'  element={< MyHistogram6 />} />}
      {/* {<Route path='/datasmell_img_template'  element={< DataSmellsImageTemplate/>} />} */}
      {<Route path='/error_in_backend' element={<ErrorInBackend/>}/>}




      </Routes>
      </BrowserRouter>
      {/* <RegExForm/> */}
    </div>
    </>
  );
}

export default App;
