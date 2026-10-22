/**
 * INKVIRE ARCHIVE TRANSMISSION SERVICE
 * ============================================================================
 * Clean architectural boundary between client state and server ingestion.
 * 
 * SUBMISSION CONTRACT SCHEMA:
 * {
 *   entity: {
 *     callsign: string,             // 3-32 chars
 *     alias?: string,               // Public/editorial display alias
 *     channel: string,              // Validated email address
 *     discipline: string            // Craft domain identifier
 *   },
 *   dossier: {
 *     domain: string,               // 'illustration' | 'editorial' | 'sound' | 'architecture' | 'narrative'
 *     portfolioUrl?: string,        // Validated URL
 *     intentStatement: string       // Min 30, max 800 chars
 *   },
 *   artifact: {
 *     fileName?: string,            // Specimen file name
 *     fileSizeBytes?: number,       // Specimen file size
 *     artifactUrl?: string,         // Specimen link
 *     notes?: string                // Context notes
 *   },
 *   covenants: {
 *     permanenceAcknowledged: boolean,
 *     authenticityCertified: boolean,
 *     dispatchAllowed: boolean
 *   },
 *   metadata: {
 *     clientEpoch: number,
 *     userAgent: string,
 *     submissionNonce: string
 *   }
 * }
 * ============================================================================
 */

// In production, configure endpoint via VITE_API_BASE_URL (defaults to local mock boundary)
const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/access-request` 
  : null;

// Submission lock tracking to prevent accidental duplicate submissions
let activeSubmissionLock = false;

/**
 * Generates an archival identifier (e.g. INK-2026-X89B)
 */
function generateArchiveToken() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INK-${new Date().getFullYear()}-${code}`;
}

/**
 * Verifies that the applicant's X / Twitter account has completed the transmission requirement:
 * Liking, commenting, and retweeting (RT) the INKVIRE post (https://x.com/inkvire/status/2113269652054778298?s=20).
 * In production: Dispatches to backend OAuth 2.0 / X API v2 verification route.
 * In client boundary: Validates handle format, network simulation, and confirms synchronization.
 * 
 * @param {string} handle - Applicant's Twitter handle
 * @param {string} targetAccount - Account to verify engagement against (default: 'INKVIRE')
 * @param {string} postUrl - Target transmission post URL
 * @returns {Promise<{verified: boolean, handle: string, targetAccount: string, postUrl: string, postId: string, actions: string[], message: string}>}
 */
export async function verifyTwitterFollowStatus(
  handle, 
  targetAccount = 'INKVIRE', 
  postUrl = 'https://x.com/inkvire/status/2113269652054778298?s=20'
) {
  const cleanHandle = handle.replace(/^@+/, '').trim();
  
  if (!cleanHandle) {
    throw new Error('Twitter handle is required.');
  }

  // Handle format validation (letters, numbers, underscores, 1-15 characters)
  const HANDLE_REGEX = /^[A-Za-z0-9_]{1,15}$/;
  if (!HANDLE_REGEX.test(cleanHandle)) {
    throw new Error('Invalid X / Twitter handle format (letters, numbers, underscore only, max 15 chars).');
  }

  // If a live verification backend is configured
  const VERIFY_ENDPOINT = import.meta.env.VITE_TWITTER_VERIFY_URL || null;
  if (VERIFY_ENDPOINT) {
    const res = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        handle: cleanHandle, 
        target: targetAccount,
        postUrl,
        postId: '2113269652054778298',
        actions: ['like', 'comment', 'retweet']
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Verification rejected by server.');
    }
    return await res.json();
  }

  // Controlled verification boundary simulation (850ms latency)
  await new Promise((resolve) => setTimeout(resolve, 850));

  return {
    verified: true,
    handle: `@${cleanHandle}`,
    targetAccount: `@${targetAccount}`,
    postUrl,
    postId: '2113269652054778298',
    actions: ['LIKE', 'COMMENT', 'RETWEET'],
    timestamp: new Date().toISOString(),
    message: `Transmission engagement confirmed. @${cleanHandle} certified: Liked, commented, and reposted transmission #2113269652054778298.`
  };
}

export const verifyTwitterEngagementStatus = verifyTwitterFollowStatus;

/**
 * Submits the compiled applicant dossier to the backend.
 * 
 * @param {Object} rawFormData
 * @returns {Promise<{success: boolean, recordId?: string, timestamp: string, receiptHash?: string, message: string}>}
 */
export async function submitAccessRequest(rawFormData) {
  if (activeSubmissionLock) {
    throw new Error('A transmission is currently being encoded. Please wait.');
  }

  // Enforce mandatory Twitter post engagement requirement
  if (!rawFormData.isTwitterFollowed) {
    throw new Error('Transmission rejected: Access requires verified engagement (Like, Comment, RT) on transmission post #2113269652054778298.');
  }

  activeSubmissionLock = true;

  try {
    // Construct sanitized payload adhering strictly to schema
    const payload = {
      entity: {
        callsign: rawFormData.callsign?.trim() || '',
        alias: rawFormData.alias?.trim() || null,
        channel: rawFormData.email?.trim().toLowerCase() || '',
        discipline: rawFormData.discipline || '',
        twitter: {
          handle: rawFormData.twitterHandle ? `@${rawFormData.twitterHandle.replace(/^@+/, '').trim()}` : null,
          postUrl: 'https://x.com/inkvire/status/2113269652054778298?s=20',
          postId: '2113269652054778298',
          actionsVerified: ['LIKE', 'COMMENT', 'RT'],
          verified: Boolean(rawFormData.isTwitterFollowed)
        }
      },
      dossier: {
        domain: rawFormData.craftDomain || '',
        portfolioUrl: rawFormData.portfolioUrl?.trim() || null,
        intentStatement: rawFormData.intentStatement?.trim() || ''
      },
      artifact: {
        fileName: rawFormData.artifactFile?.name || null,
        fileSizeBytes: rawFormData.artifactFile?.size || null,
        artifactUrl: rawFormData.artifactUrl?.trim() || null,
        notes: rawFormData.artifactNotes?.trim() || null
      },
      covenants: {
        permanenceAcknowledged: Boolean(rawFormData.covenantPermanence),
        authenticityCertified: Boolean(rawFormData.covenantAuthenticity),
        dispatchAllowed: Boolean(rawFormData.covenantDispatch)
      },
      metadata: {
        clientEpoch: Date.now(),
        userAgent: navigator.userAgent,
        submissionNonce: Math.random().toString(36).substring(2, 12).toUpperCase()
      }
    };

    // If an external backend is configured, dispatch HTTP POST
    if (API_ENDPOINT) {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server returned HTTP ${response.status}`);
      }

      return await response.json();
    }

    // Default Boundary: Controlled client mock transmission with realistic network latency
    // Explicitly documented: this is a local simulated transmission until a live API is bound.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Simulated verification receipt
    const receiptHash = `0x${Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')}`;
    const archiveRecordId = generateArchiveToken();

    return {
      success: true,
      simulated: true, // Transparent indicator that this ran on the client mock boundary
      recordId: archiveRecordId,
      receiptHash,
      timestamp: new Date().toISOString(),
      applicantCallsign: payload.entity.callsign,
      twitterConduit: payload.entity.twitter.handle,
      twitterPostUrl: payload.entity.twitter.postUrl,
      twitterActions: 'LIKE + COMMENT + RT',
      message: 'Dossier successfully accepted into the INKVIRE transmission queue.'
    };
  } finally {
    activeSubmissionLock = false;
  }
}

