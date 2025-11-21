import React from "react";

const TextResult = ({ text }) => {
  if (!text) {
    return (
      <p className="placeholder-text">
        No text extracted yet. Upload a PDF or image to see the extracted
        content here.
      </p>
    );
  }

  return (
    <div className="text-result">
      <pre>{text}</pre>
    </div>
  );
};

export default TextResult;
