/**
 * @Date:  2023-02-28
 * @Language: React.js
 * @Description: App.js- This file is the key component of the frontend. It contains the navigation bar and the main page.
 */

import React from "react";
// import { useState } from "react";
// import axios from "axios";

import MainPage from "./components/DefaultPage/Mainpage";


// @Description: This function returns the key components of the frontend.
function App() {
  return (
    <div className="total-main">
     
      <MainPage />
      {/* <RegExForm/> */}
    </div>
  );
}

export default App;
