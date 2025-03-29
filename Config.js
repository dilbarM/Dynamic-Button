import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Config = () => {
  const [buttonText, setButtonText] = useState("Press Here"); 
  const [actionList, setActionList] = useState([]); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig")) || {};
    setButtonText(savedConfig?.label ?? "Press Here");
    setActionList(savedConfig?.actions ?? []);
  }, []);

  
  const insertAction = (actionType) => {
    if (!actionType) return;

    let newAction = { type: actionType };

    
    if (actionType === "Show Image") {
      const imageUrl = prompt("Enter the image URL:");
      if (!imageUrl || !isValidUrl(imageUrl)) {
        alert("Invalid URL. Please enter a valid link.");
        return;
      }
      newAction.url = imageUrl;
    }

    setActionList([...actionList, newAction]);
  };


  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    return urlPattern.test(url);
  };

  
  const deleteAction = (indexToRemove) => {
    setActionList(actionList.filter((_, index) => index !== indexToRemove));
  };

  
  const shiftActionUp = (index) => {
    if (index === 0) return;
    const updatedActions = [...actionList];
    [updatedActions[index - 1], updatedActions[index]] = [
      updatedActions[index],
      updatedActions[index - 1],
    ];
    setActionList(updatedActions);
  };

  
  const shiftActionDown = (index) => {
    if (index === actionList.length - 1) return;
    const updatedActions = [...actionList];
    [updatedActions[index], updatedActions[index + 1]] = [
      updatedActions[index + 1],
      updatedActions[index],
    ];
    setActionList(updatedActions);
  };

  
  const storeConfiguration = () => {
    localStorage.setItem(
      "buttonConfig",
      JSON.stringify({ label: buttonText, actions: actionList })
    );
    navigate("/output");
  };

  return (
    <div className="config-container">
      <h2>Customize Your Button</h2>

     
      <div className="form-group">
        <label>Set Button Text:</label>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          placeholder="Enter Button Label"
        />
      </div>

     
      <div className="form-group">
        <label>Add Action:</label>
        <select onChange={(e) => insertAction(e.target.value)} value="">
          <option value="" disabled>
            Select Action Type
          </option>
          <option value="Alert">Alert</option>
          <option value="Show Text">Show Text</option>
          <option value="Show Image">Show Image</option>
        </select>
      </div>

      
      <div className="action-sequence">
        <h3>Action Sequence:</h3>
        {actionList.length === 0 ? (
          <p>No actions added yet.</p>
        ) : (
          <ul>
            {actionList.map((action, index) => (
              <li key={index} className="action-item">
                <span className="action-index">{index + 1}.</span>
                <span className="action-type">{action.type}</span>
                {action.url && (
                  <span className="action-detail">(URL: {action.url})</span>
                )}

                <div className="action-controls">
                  <button
                    onClick={() => shiftActionUp(index)}
                    disabled={index === 0}
                    className="move-btn"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => shiftActionDown(index)}
                    disabled={index === actionList.length - 1}
                    className="move-btn"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => deleteAction(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <button onClick={storeConfiguration} className="save-btn">
        Save & Preview
      </button>
    </div>
  );
};

export default Config;
