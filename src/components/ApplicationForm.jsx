import React, { useState } from 'react';
import { FormStepper } from './FormStepper';
import { IdentitySection } from './sections/IdentitySection';
import { DossierSection } from './sections/DossierSection';
import { ArtifactSection } from './sections/ArtifactSection';
import { CovenantSection } from './sections/CovenantSection';
import { ReviewSummary } from './sections/ReviewSummary';
import { SuccessScreen } from './SuccessScreen';
import { Button } from './form/Button';
import { 
  validateSection01, 
  validateSection02, 
  validateSection03, 
  validateSection04, 
  validateFullDossier 
} from '../utils/validation';
import { submitAccessRequest } from '../services/api';

export function ApplicationForm({ onBackToLanding }) {
  // Application Form State
  const [formData, setFormData] = useState({
    callsign: '',
    alias: '',
    email: '',
    discipline: '',
    twitterHandle: '',
    isTwitterFollowed: false,
    craftDomain: '',
    portfolioUrl: '',
    intentStatement: '',
    artifactFile: null,
    artifactUrl: '',
    artifactNotes: '',
    covenantPermanence: false,
    covenantAuthenticity: false,
    covenantDispatch: true
  });

  // Current Step (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  // Field Errors
  const [errors, setErrors] = useState({});

  // Submission lifecycle states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);

  // Update form field
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific error upon typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Section validation dispatcher
  const validateCurrentStep = () => {
    let result = { isValid: true, errors: {} };

    switch (currentStep) {
      case 1:
        result = validateSection01(formData);
        break;
      case 2:
        result = validateSection02(formData);
        break;
      case 3:
        result = validateSection03(formData);
        break;
      case 4:
        result = validateSection04(formData);
        break;
      case 5:
        result = validateFullDossier(formData);
        break;
      default:
        break;
    }

    setErrors(result.errors);
    return result.isValid;
  };

  // Advance to next step
  const handleNextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go to previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Jump to specific step (only if unlocked)
  const handleStepJump = (stepNum) => {
    if (stepNum <= maxStepReached) {
      setCurrentStep(stepNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Final Transmission Submission
  const handleSubmitDossier = async () => {
    const fullValidation = validateFullDossier(formData);
    if (!fullValidation.isValid) {
      setErrors(fullValidation.errors);
      setSubmissionError('Validation failed across dossier sections. Please review requirements.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const receipt = await submitAccessRequest(formData);
      setSubmissionReceipt(receipt);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmissionError(err.message || 'Transmission failed. Network error or server rejected packet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      callsign: '',
      alias: '',
      email: '',
      discipline: '',
      twitterHandle: '',
      isTwitterFollowed: false,
      craftDomain: '',
      portfolioUrl: '',
      intentStatement: '',
      artifactFile: null,
      artifactUrl: '',
      artifactNotes: '',
      covenantPermanence: false,
      covenantAuthenticity: false,
      covenantDispatch: true
    });
    setCurrentStep(1);
    setMaxStepReached(1);
    setErrors({});
    setSubmissionReceipt(null);
    onBackToLanding();
  };

  // If successfully submitted, render the verified success screen
  if (submissionReceipt) {
    return (
      <div className="form-viewport">
        <div className="form-panel-wrapper">
          <SuccessScreen receipt={submissionReceipt} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="form-viewport">
      <div className="form-panel-wrapper">
        {/* Top Navigation */}
        <div className="form-top-nav">
          <button
            type="button"
            className="btn-back-archive"
            onClick={onBackToLanding}
            aria-label="Return to archive landing page"
          >
            ← RETURN TO ARCHIVE
          </button>

          <div className="form-system-status">
            CIPHER : <strong>SHA-256 / TRANSMIT</strong>
          </div>
        </div>

        {/* Form Card Container */}
        <div className="form-panel-card" role="region" aria-label="Archive Access Application">
          <div className="form-panel-header">
            <div className="form-header-pretitle">ARCHIVE INGESTION PROTOCOL</div>
            <h1 className="form-header-title">ACCESS PETITION</h1>
            <p className="form-header-desc">
              Complete each section to compile your dossier. Incomplete records will be discarded at the boundary.
            </p>
          </div>

          {/* Stepper Progress */}
          <FormStepper
            currentStep={currentStep}
            maxStepReached={maxStepReached}
            onStepClick={handleStepJump}
          />

          {/* Form Content Body */}
          <div className="form-panel-body">
            {submissionError && (
              <div 
                className="form-error" 
                style={{ 
                  backgroundColor: 'var(--status-error-bg)', 
                  border: '1px solid var(--status-error)', 
                  padding: '12px 16px', 
                  marginBottom: '20px' 
                }}
                role="alert"
              >
                {submissionError}
              </div>
            )}

            {currentStep === 1 && (
              <IdentitySection
                data={formData}
                onChange={handleFieldChange}
                errors={errors}
                status={maxStepReached > 1 ? 'VALIDATED' : 'CURRENT'}
              />
            )}

            {currentStep === 2 && (
              <DossierSection
                data={formData}
                onChange={handleFieldChange}
                errors={errors}
                status={maxStepReached > 2 ? 'VALIDATED' : 'CURRENT'}
              />
            )}

            {currentStep === 3 && (
              <ArtifactSection
                data={formData}
                onChange={handleFieldChange}
                errors={errors}
                status={maxStepReached > 3 ? 'VALIDATED' : 'CURRENT'}
              />
            )}

            {currentStep === 4 && (
              <CovenantSection
                data={formData}
                onChange={handleFieldChange}
                errors={errors}
                status={maxStepReached > 4 ? 'VALIDATED' : 'CURRENT'}
              />
            )}

            {currentStep === 5 && (
              <ReviewSummary
                data={formData}
                onEditSection={handleStepJump}
              />
            )}

            {/* Form Actions Footer */}
            <div className="form-actions-bar">
              <div className="form-actions-left">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                  >
                    PREVIOUS
                  </Button>
                )}
              </div>

              <div className="form-actions-right">
                {currentStep < 5 ? (
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                  >
                    CONTINUE ➔
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmitDossier}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENCODING TRANSMISSION...' : 'TRANSMIT DOSSIER ➔'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
