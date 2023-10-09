import React from 'react';
import "./pathIndicator.scss";

const PathIndicator = ({ steps, currentStep }) => {
  return (
    <div className="path-indicator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`path-indicator__step ${index === currentStep ? 'active' : ''}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default PathIndicator;
