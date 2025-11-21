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
          <span className="stat-value">
            {analysis.hashtags.length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Links</span>
          <span className="stat-value">
            {analysis.links.length}
          </span>
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

      {/* Hashtag list */}
      <div className="spacing-top">
        <h3 style={{ fontSize: "0.95rem", marginBottom: "0.3rem" }}>
          Hashtags found
        </h3>
        {analysis.hashtags.length === 0 ? (
          <p className="placeholder-text">
            No hashtags detected. Try adding 1–3 relevant hashtags.
          </p>
        ) : (
          <ul className="suggestions-list">
            {analysis.hashtags.map((tag, idx) => (
              <li key={idx} className="suggestion-item">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Link list */}
      <div className="spacing-top">
        <h3 style={{ fontSize: "0.95rem", marginBottom: "0.3rem" }}>
          Links found
        </h3>
        {analysis.links.length === 0 ? (
          <p className="placeholder-text">
            No links detected. Add a relevant link if you want users to learn more
            or visit a page.
          </p>
        ) : (
          <ul className="suggestions-list">
            {analysis.links.map((link, idx) => (
              <li key={idx} className="suggestion-item">
                <a
                  href={link.startsWith("http") ? link : `https://${link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EngagementSuggestions;
