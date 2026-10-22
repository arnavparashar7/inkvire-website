/**
 * INKVIRE Application Validation Suite
 * Robust, accessible field-level and section-level validation
 */

// Email regex adhering to RFC 5322 simplified standard
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// URL validation with protocol support
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

/**
 * Validates Section 01: Entity Designation
 */
export function validateSection01(data) {
  const errors = {};

  if (!data.callsign || !data.callsign.trim()) {
    errors.callsign = 'Designation callsign is required.';
  } else if (data.callsign.trim().length < 3) {
    errors.callsign = 'Callsign must be at least 3 characters.';
  } else if (data.callsign.trim().length > 32) {
    errors.callsign = 'Callsign must not exceed 32 characters.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Secure transmission channel (email) is required.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Enter a valid, reachable email address.';
  }

  if (!data.discipline || !data.discipline.trim()) {
    errors.discipline = 'Please select your primary craft discipline.';
  }

  // Mandatory X / Twitter Post Engagement Requirement (Like, Comment, RT)
  const cleanTwitter = data.twitterHandle ? data.twitterHandle.replace(/^@+/, '').trim() : '';
  if (!cleanTwitter) {
    errors.twitter = 'Your X / Twitter handle is required to confirm transmission engagement.';
  } else if (!/^[A-Za-z0-9_]{1,15}$/.test(cleanTwitter)) {
    errors.twitter = 'Invalid X / Twitter handle format (max 15 chars, alphanumeric & underscore).';
  } else if (!data.isTwitterFollowed) {
    errors.twitter = 'You must like, comment, and RT transmission post #2113269652054778298 on X and verify engagement.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates Section 02: Dossier & Craft
 */
export function validateSection02(data) {
  const errors = {};

  if (!data.craftDomain) {
    errors.craftDomain = 'Select your primary operational domain.';
  }

  if (!data.intentStatement || !data.intentStatement.trim()) {
    errors.intentStatement = 'Statement of intent is required to evaluate entry.';
  } else if (data.intentStatement.trim().length < 30) {
    errors.intentStatement = `Statement must be at least 30 characters (currently ${data.intentStatement.trim().length}).`;
  } else if (data.intentStatement.trim().length > 800) {
    errors.intentStatement = 'Statement must not exceed 800 characters.';
  }

  if (data.portfolioUrl && data.portfolioUrl.trim()) {
    if (!URL_REGEX.test(data.portfolioUrl.trim())) {
      errors.portfolioUrl = 'Please provide a valid web URL (e.g. https://portfolio.art).';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates Section 03: Artifact Specimen Transmission
 */
export function validateSection03(data) {
  const errors = {};

  // Artifact can be file upload or external specimen URL or both
  if (!data.artifactFile && (!data.artifactUrl || !data.artifactUrl.trim())) {
    errors.artifact = 'Provide either an artifact specimen file or direct repository/folio URL.';
  }

  if (data.artifactUrl && data.artifactUrl.trim()) {
    if (!URL_REGEX.test(data.artifactUrl.trim())) {
      errors.artifactUrl = 'Enter a valid URL for the artifact repository.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates Section 04: Covenant & Declarations
 */
export function validateSection04(data) {
  const errors = {};

  if (!data.covenantPermanence) {
    errors.covenantPermanence = 'You must acknowledge the permanence covenant.';
  }

  if (!data.covenantAuthenticity) {
    errors.covenantAuthenticity = 'Authenticity declaration is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates complete dossier before final submission
 */
export function validateFullDossier(data) {
  const s1 = validateSection01(data);
  const s2 = validateSection02(data);
  const s3 = validateSection03(data);
  const s4 = validateSection04(data);

  const allErrors = {
    ...s1.errors,
    ...s2.errors,
    ...s3.errors,
    ...s4.errors
  };

  return {
    isValid: s1.isValid && s2.isValid && s3.isValid && s4.isValid,
    errors: allErrors,
    sectionValidity: {
      section01: s1.isValid,
      section02: s2.isValid,
      section03: s3.isValid,
      section04: s4.isValid
    }
  };
}
