import React from 'react';

const STEP_DEFINITIONS = [
  { step: 1, label: '01 IDENTITY', short: 'IDENTITY' },
  { step: 2, label: '02 DOSSIER', short: 'DOSSIER' },
  { step: 3, label: '03 SPECIMEN', short: 'SPECIMEN' },
  { step: 4, label: '04 COVENANT', short: 'COVENANT' },
  { step: 5, label: '05 REVIEW', short: 'REVIEW' }
];

export function FormStepper({
  currentStep,
  maxStepReached,
  onStepClick
}) {
  const displayStepNum = currentStep <= 4 ? `STEP 0${currentStep} OF 04` : 'FINAL VERIFICATION';

  return (
    <div className="form-stepper" role="navigation" aria-label="Application Progress">
      <div className="stepper-header">
        <span className="stepper-label">{displayStepNum}</span>
        <span className="stepper-metric">
          {Math.min(100, Math.round(((currentStep - 1) / 4) * 100))}% COMPLETE
        </span>
      </div>

      <div className="stepper-track" aria-hidden="true">
        {[1, 2, 3, 4].map((stepNum) => {
          let segmentClass = 'stepper-segment';
          if (stepNum < currentStep) segmentClass += ' completed';
          else if (stepNum === currentStep) segmentClass += ' current';
          return <div key={stepNum} className={segmentClass} />;
        })}
      </div>

      <div className="stepper-nav-tabs">
        {STEP_DEFINITIONS.map((def) => {
          const isCurrent = currentStep === def.step;
          const isCompleted = def.step < currentStep;
          const isClickable = def.step <= maxStepReached;

          let tabClass = 'stepper-tab-btn';
          if (isCurrent) tabClass += ' is-active';
          if (isCompleted) tabClass += ' is-completed';

          return (
            <button
              key={def.step}
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick(def.step)}
              className={tabClass}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {def.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
