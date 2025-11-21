import React from "react";
import { analyzeText } from "../utils/textAnalysis.js";

const EngagementSuggestions = ({ text }) => {
  const analysis = analyzeText(text || "");

  return (
    <div className="suggestions">
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-label">Words</span>
          <span className="stat-value">{analysis.wordCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Characters</span>
          <span className="stat-value">{analysis.charCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Hashtags</span>
          <span className="stat-value">{analysis.hasHashtag ? "Yes" : "No"}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Links</span>
          <span className="stat-value">{analysis.hasLink ? "Yes" : "No"}</span>
        </div>
      </div>

      <ul className="suggestions-list">
        {analysis.suggestions.length === 0 ? (
          <li className="suggestion-item">
            Add or edit text above to see engagement suggestions.
          </li>
        ) : (
          analysis.suggestions.map((item, index) => (
            <li key={index} className="suggestion-item">
              {item}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EngagementSuggestions;
