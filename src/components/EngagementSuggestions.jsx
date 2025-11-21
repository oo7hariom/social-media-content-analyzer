import React, { useState } from "react";
import { analyzeText } from "../utils/textAnalysis.js";

const MAX_ITEMS = 15;

const EngagementSuggestions = ({ text }) => {
  const analysis = analyzeText(text || "");
  const [showAllHashtags, setShowAllHashtags] = useState(false);
  const [showAllLinks, setShowAllLinks] = useState(false);

  const visibleHashtags = showAllHashtags
    ? analysis.hashtags
    : analysis.hashtags.slice(0, MAX_ITEMS);

  const visibleLinks = showAllLinks
    ? analysis.links
    : analysis.links.slice(0, MAX_ITEMS);

  const remainingHashtags =
    analysis.hashtags.length > MAX_ITEMS
      ? analysis.hashtags.length - MAX_ITEMS
      : 0;

  const remainingLinks =
    analysis.links.length > MAX_ITEMS
      ? analysis.links.length - MAX_ITEMS
      : 0;

  return (
    <div className="suggestions">
      {/* Stats */}
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
          <span className="stat-value">{analysis.hashtags.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Links</span>
          <span className="stat-value">{analysis.links.length}</span>
        </div>
      </div>

      {/* Main suggestions list */}
      <ul className="suggestions-list main-suggestions">
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

      {/* Hashtags + Links side-by-side */}
      <div className="two-columns spacing-top">
        {/* LEFT: Hashtags */}
        <div className="column-box">
          <h3 className="subsection-title">Hashtags Found</h3>
          {analysis.hashtags.length === 0 ? (
            <p className="placeholder-text">
              No hashtags detected. Try adding 1–3 relevant hashtags.
            </p>
          ) : (
            <>
              <ul className="suggestions-list chip-list">
                {visibleHashtags.map((tag, idx) => (
                  <li key={idx} className="chip-item">
                    {tag}
                  </li>
                ))}
              </ul>

              {analysis.hashtags.length > MAX_ITEMS && (
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={() => setShowAllHashtags((prev) => !prev)}
                >
                  {showAllHashtags
                    ? "Show less"
                    : `Load more (${remainingHashtags} more)`}
                </button>
              )}
            </>
          )}
        </div>

        {/* RIGHT: Links */}
        <div className="column-box">
          <h3 className="subsection-title">Links Found</h3>
          {analysis.links.length === 0 ? (
            <p className="placeholder-text">
              No links detected. Add a useful link for more engagement.
            </p>
          ) : (
            <>
              <ul className="suggestions-list chip-list">
                {visibleLinks.map((link, idx) => (
                  <li key={idx} className="chip-item">
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

              {analysis.links.length > MAX_ITEMS && (
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={() => setShowAllLinks((prev) => !prev)}
                >
                  {showAllLinks
                    ? "Show less"
                    : `Load more (${remainingLinks} more)`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementSuggestions;
