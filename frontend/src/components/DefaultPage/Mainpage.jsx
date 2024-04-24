import Excel from "../ExcelSheet/Excel";
import React, { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import Papa from "papaparse";
import axios from "axios";
import "./Mainpage.css";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import Codebox from "../Codebox";
import Table from "./Table";
import io from 'socket.io-client';
import socket from "./common_socket"

// import MyBarChart from "../../reactGraphs/MyBarChart.jsx";

const language = "python";

export default function MainPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bargraph_sp_miss, setBargraph_sp_miss] = useState(null);
  const [bargraph_nan, setBargraph_nan] = useState(null);
  const [bargraph_binning_cat, setBargraph_binning_cat] = useState(null);
  const [bargraph_class_imbal, setBargraph_class_imbal] = useState(null);
  const bargraph_sp_char = null;
  const bargraph_hum_friendly = null;
  const bargraph_tr_spaces = null;
  const [boxplot, setBoxplot] = useState(null);
  const [click, setClick] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);
  const[suspect_sign_metrics,setsuspect]=useState(false);
  const[suspect_detection_metrics,setsuspectt]=useState(false);
  const[amb_datetime_metrics,setdatetimee]=useState(false);
  const[contractions_metrics,setcontractions]=useState(false);
  const [dummy_value_metrics,setdummy]=useState(0);
  const [dummy_value_metrics2,setdummy2]=useState(0);


  const [intasfloat,setintasfloat]=useState(false);

  const handleFileUpload = (event) => {
    setFileChosen(true);
    if(event.target.files.length==0){
      return
    }
    setSelectedFile(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (result) {
        setJsonData(result.data);
        console.log(result.data);
      },
    });
  };

  const handleUpload = () => {
    setClick(true);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    axios
      .post("http://localhost:5001/upload", formData)  // Update the URL accordingly
      .then((response) => {
        
        if (!response.data || !response.data.metrics) {
          // Navigate to a new page if response data is null or doesn't have metrics
          navigate('/error_in_backend'); // Replace '/new-page-url' with the actual URL of the new page
          return; // Stop further execution
        }
        console.log("before navigating to datasmells");
        navigate('/datasmells',{ state: { ok:JSON.stringify(response) } });
console.log("hi");
       

     
         console.log(response["data"]);
       
        navigate("/datasmells",{ state: { ok:response["data"] }});
       
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
 

// ...
const handleUpload_refactor = () => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("file", selectedFile);

  // const socket = io("localhost:5001/", {
  //   transports: ["websocket"],
  //   cors: {
  //     origin: "http://localhost:3000/",
  //   },
  // });

  // socket.emit('refactoring_update', { method: 'refactoring_started' });
  console.log("in handleupload refactor");
  navigate('/refactor_status');
  console.log("after navigating");
    axios
      .post("http://localhost:5001/refactor", formData)
      .then((response) => {
        if (!response.data || !response.data.refactored_csv) {
          navigate('/error_in_backend');
          return;
        }
        console.log("received df from backend")
        console.log(response.data);

        const blob = new Blob([response.data.refactored_csv], { type: 'text/csv' });

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'refactored_data.csv';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);

        setIsLoading(false);
        navigate("/refactoring_finished")
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
 
};


  // const handleUpload_refactor = () => {
  //   setClick(true);
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  
  //   axios
  //     .post("http://localhost:5001/refactor", formData)
  //     .then((response) => {
  //       if (!response.data || !response.data.refactored_csv) {
  //         navigate('/error_in_backend');
  //         return;
  //       }
  //       console.log(response.data);
        
  //       // Create a Blob object from the refactored CSV data
  //       const blob = new Blob([response.data.refactored_csv], { type: 'text/csv' });
  
  //       // Create a temporary anchor element to trigger the download
  //       const a = document.createElement('a');
  //       a.href = window.URL.createObjectURL(blob);
  //       a.download = 'refactored_data.csv'; // Specify the filename
  //       a.style.display = 'none';
  
  //       // Append the anchor element to the body and trigger the download
  //       document.body.appendChild(a);
  //       a.click();
  
  //       // Cleanup: Remove the temporary anchor element
  //       document.body.removeChild(a);
  
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // };
  const handleDownload = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("page-content.pdf");
    });
  };

  return (
    <div className="App">
<div className="inside"> 
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="heading-text">
        <h1>SmellSweep-DataSmell Detector</h1>
      </div>
      <div className="Intput-and-Btn">
        <br />
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="input-file"
        />
        <Button
          className="analyze-btn d-flex align-self-center"
          variant="success"
          size="lg"
          onClick={handleUpload}
        >
 
          Analysis
          
          
    



        </Button>
       
        <Button
          className="analyze-btn d-flex align-self-center"
          variant="success"
          size="lg"
          onClick={handleUpload_refactor}
        >
 
         Refactor
          
      



        </Button>

      </div>
      {fileChosen && jsonData && <Excel myjson={jsonData} />}
      {analysisData && (
        <div className="analysis-container">
          {/* Rest of your code */}
         
        </div>
      )}

</div>

    </div>
  );
}


function splitIntoSentences(text) {
  const sentences = text.split("\n");
  return sentences.filter((sentence) => sentence.length > 0);
}