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
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter ,Route,Routes,Navigate } from 'react-router-dom';
import MyHistogram from "./reactGraphs/Chart";
import MyHistogram2 from "./reactGraphs/charts_dummyValues";
import MyHistogram3 from "./reactGraphs/unnecessary_char_graph";
import AmbiguousValuesComponent from "./reactGraphs/ambiguous_graph";
import CasingInconsistenciesGraph from "./reactGraphs/casing_graph";
import DuplicateDataGraph from "./reactGraphs/duplicate_value_graph";
import ExtremeValuesGraph from "./reactGraphs/extreme_value_graph";
import LongDataValuesGraph from "./reactGraphs/longdata_value_graph";
import MisspelledDataGraph from "./reactGraphs/mis_spell_graph";
import SuspectClassValuesGraph from "./reactGraphs/suspectclass_value_graph";
import MissingDataGraph from "./reactGraphs/missing_value_graph";

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
      {<Route path='/charts2'  element={< MyHistogram2 />} />}
      {<Route path='/charts3'  element={< MyHistogram3 />} />}
      {<Route path='/charts_v1'  element={< AmbiguousValuesComponent />} />}
      {<Route path='/charts_v2'  element={< CasingInconsistenciesGraph />} />}
      {<Route path='/charts_v3'  element={< DuplicateDataGraph />} />}
      {<Route path='/charts_v4'  element={< ExtremeValuesGraph />} />}
      {<Route path='/charts_v5'  element={< LongDataValuesGraph />} />}
      {<Route path='/charts_v6'  element={< MisspelledDataGraph />} />}
      {<Route path='/charts_v7'  element={< MissingDataGraph />} />}
      {<Route path='/charts_v8'  element={< SuspectClassValuesGraph />} />}
      


      </Routes>
      </BrowserRouter>
      {/* <RegExForm/> */}
    </div>
    </>
  );
}

export default App;
