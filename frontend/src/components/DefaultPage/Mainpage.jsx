import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import "./Mainpage.css";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import Excel from "../ExcelSheet/Excel";
import FloatAsStringChart from "./thirdsection/float_as_string";
import Datetimefun from "./thirdsection/datetime";
import IntegerAsFloatChart from "./thirdsection/int_as_float";
import IntegerAsStringChart from "./thirdsection/integer_as_string";
const language = "python";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dummyValueMetrics, setDummyValueMetrics] = useState(null);
  const [suspectCharacter, setSuspectCharacter] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [floatstring,setfloatstring]=useState(null);
  const [integerasfloat,setintegerasfloat]=useState(null);
  const [integerasstring,setintegerasstring]=useState(null);

  // const [graphsDateTime, setGraphsDateTime] = useState(null);
  const [fileChosen, setFileChosen] = useState(false);

  const handleFileUpload = (event) => {
    setFileChosen(true);
    if (event.target.files.length === 0) {
      return;
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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    axios
      .post("http://localhost:5001/upload", formData)
      .then((response) => {
        console.log(response["data"]);
        const { metrics } = response.data;
        setDummyValueMetrics(metrics.dummy_values);
        setSuspectCharacter(metrics.suspect_character_encoding);
        setDateTime(metrics.date_time_smell);
        setIsLoading(false);
        setfloatstring(metrics.float_as_string);
        setintegerasfloat(metrics.integer_as_float);
        setintegerasstring(metrics.integer_as_string);
        // setGraphsDateTime(metrics.date_time_smell);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

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
      </div>
      {selectedFile && fileChosen && jsonData && (
        <Excel myjson={jsonData} />
      )}
      {dummyValueMetrics && (
        <div className="dummy-value-metrics-container">
          <pre>{JSON.stringify(dummyValueMetrics, null, 2)}</pre>
        </div>
      )}
      {suspectCharacter && (
        <div className="dummy-value-metrics-container">
          <pre>{JSON.stringify(suspectCharacter, null, 2)}</pre>
        </div>
      )}
      {dateTime && <Datetimefun datetime_obj={dateTime}/>}
      {floatstring && <FloatAsStringChart obj={floatstring}/>}
      {integerasfloat && <IntegerAsFloatChart obj={integerasfloat}/>}
      {integerasstring && <IntegerAsStringChart obj={integerasstring}/>}
      

    </div>
  );
}
