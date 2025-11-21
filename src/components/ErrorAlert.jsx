import React from "react";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-alert">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorAlert;
