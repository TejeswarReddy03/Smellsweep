import React, { useEffect, useState } from "react";
import socket from "./DefaultPage/common_socket";
import "./RefactorStatus.css"; // Import CSS file for styling

function RefactorStatus() {
  const [statusList, setStatusList] = useState([]);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const methodIndexSet = new Set(); // Maintain a set to store unique method-index pairs

    socket.on("refactoring_update", (msg) => {
      // Check if the method-index pair is already present in the set
      const methodIndexPair = `${msg.method}-${msg.index}-${msg.status}`;
      if (!methodIndexSet.has(methodIndexPair)) {
        // If not present, add it to the list and the set
        setStatusList((prevList) => [msg, ...prevList.slice(0, 1)]); // Only keep the latest card
        methodIndexSet.add(methodIndexPair);
        setShowTick(true);
        setTimeout(() => {
          setShowTick(false);
        }, 500); // Reset showTick after 0.5 second
      }
    });

    return () => {
      // Cleanup the socket listener on unmount
      socket.off("refactoring_update");
    };
  }, []);

  return (
    <div className="status-container">
      <h1 className="title">Refactor Status</h1>
      <div className="status-list">
        {/* Render the latest status */}
        {statusList.map((status, index) => (
          <div key={`${status.index}-${status.method}-${status.status}`} className={`status-item ${index === 0 ? "new" : ""}`}>
            <p className="index">Index: {status.index}</p>
            <p className="method">Method: {status.method}</p>
            <p className="status">Status: {status.status}</p>
            <div className="tick-box">
              <input type="checkbox" checked={index === 0 && showTick} disabled />
              {index === 0 && showTick && <span className="tick"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RefactorStatus;
