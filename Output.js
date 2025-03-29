import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Output = () => {
  const [buttonText, setButtonText] = useState("Press Here");
  const [actionList, setActionList] = useState([]);
  const [textDisplay, setTextDisplay] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig")) || {};
    setButtonText(savedConfig?.label ?? "Press Here");
    setActionList(savedConfig?.actions ?? []);
  }, []);

  
  const executeActions = async () => {
   
    setTextDisplay("");
    setUserName("");

    
    for (const action of actionList) {
      switch (action.type) {
        case "Alert":
          alert("Welcome! 🎉");
          const name = prompt("Enter your name:");
          if (name) {
            setUserName(`Hello, ${name}!`);
          }
          break;
        case "Show Text":
          const enteredText = prompt("Enter the text to display:");
          if (enteredText) {
            setTextDisplay(enteredText);
          }
          break;
        case "Show Image":
          if (action.url) {
            window.location.href = action.url; 
          }
          break;
        default:
          break;
      }
    }
  };

  
  const returnToConfig = () => {
    navigate("/");
  };

  return (
    <div className="output-container">
      <h2>Workflow Output</h2>

      <div className="button-container">
        <button onClick={executeActions} className="action-button">
          {buttonText}
        </button>
      </div>

      <div className="results-container">
      
        {textDisplay && (
          <div className="result-item">
            <h3>Text Input:</h3>
            <p>{textDisplay}</p>
          </div>
        )}

       
        {userName && (
          <div className="result-item">
            <h3>User Name:</h3>
            <p>{userName}</p>
          </div>
        )}
      </div>

      <div className="actions-summary">
        <h3>Configured Actions:</h3>
        <ul>
          {actionList.map((action, index) => (
            <li key={index}>
              {action.type}
              {action.url && ` (URL: ${action.url})`}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={returnToConfig} className="config-btn">
        Back to Config
      </button>
    </div>
  );
};

export default Output;
