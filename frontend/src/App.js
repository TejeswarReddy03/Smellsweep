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
// import IntegerAsStringChart from "./reactGraphs/Chart";
import Appp from "./reactGraphs/Chart";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter ,Route,Routes,Navigate } from 'react-router-dom';
import MyHistogram from "./reactGraphs/Chart";
// import IntegerAsStringChart from './reactGraphs/Chart';

// @Description: This function returns the key components of the frontend.

function App() {
  const sampleData = {
    status: true, // Set to false to see the "No integer-as-string data smells detected" message
    integer_as_string: {
      column1: {
        percentage: 25,
        rows_with_smell: 10,
      },
      column2: {
        percentage: 15,
        rows_with_smell: 8,
      },
      column3: {
        percentage: 30,
        rows_with_smell: 15,
      },
      // Add more columns and details as needed
    },
  };
  return (
    <>
    <div className="total-main">
      <BrowserRouter>
        <Routes>
        {<Route index element ={<MainPage/>} />}
      {<Route path='/datasmells'  element={< DataSmells />} />}
      {<Route path='/charts'  element={< MyHistogram />} />}

      </Routes>
      </BrowserRouter>
      {/* <RegExForm/> */}
    </div>
    </>
  );
}

export default App;
