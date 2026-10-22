import React, { useState } from 'react';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';
import { verifyTwitterFollowStatus } from '../../services/api';

export const TARGET_POST_URL = 'https://x.com/inkvire/status/2113269652054778298?s=20';
export const TARGET_POST_ID = '2113269652054778298';

/**
 * X / Twitter Requirement Component
 * Enforces liking, commenting, and retweeting (RT) the INKVIRE transmission post on X:
 * https://x.com/inkvire/status/2113269652054778298?s=20
 */
export function TwitterRequirement({
  handle = '',
  isFollowed = false,
  onHandleChange,
  onFollowVerified,
  error = null,
  targetAccount = 'INKVIRE',
  targetPostUrl = TARGET_POST_URL,
  targetPostId = TARGET_POST_ID
}) {
  const [hasOpenedPost, setHasOpenedPost] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  // Normalize handle input (strip @ if user typed it)
  const cleanHandle = handle.replace(/^@+/, '').trim();

  // Intent action links for convenience
  const replyIntentUrl = `https://x.com/intent/tweet?in_reply_to=${targetPostId}`;
  const retweetIntentUrl = `https://x.com/intent/retweet?tweet_id=${targetPostId}`;
  const likeIntentUrl = `https://x.com/intent/like?tweet_id=${targetPostId}`;

  const handleOpenPost = () => {
    setHasOpenedPost(true);
    setVerificationError(null);
    window.open(targetPostUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenIntent = (url) => {
    setHasOpenedPost(true);
    setVerificationError(null);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleVerify = async () => {
    if (!cleanHandle) {
      setVerificationError('Enter your X / Twitter handle to verify transmission engagement.');
      return;
    }

    if (!hasOpenedPost && !isFollowed) {
      setVerificationError('Please click "OPEN TRANSMISSION POST" first to like, comment, and RT.');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    try {
      const result = await verifyTwitterFollowStatus(cleanHandle, targetAccount, targetPostUrl);
      if (result.verified) {
        onFollowVerified(true);
      } else {
        setVerificationError(result.message || 'Engagement verification rejected. Please ensure all actions are complete.');
      }
    } catch (err) {
      setVerificationError(err.message || 'Verification service unreachable.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetVerification = () => {
    onFollowVerified(false);
    setHasOpenedPost(false);
    setVerificationError(null);
  };

  const displayError = error || verificationError;

  return (
    <div className={`twitter-requirement-card ${isFollowed ? 'is-verified' : ''} ${displayError ? 'has-error' : ''}`}>
      <div className="twitter-card-header">
        <div className="twitter-eyebrow">
          <span className="twitter-cipher-code">MANDATORY PROTOCOL // TRANSMISSION ENGAGEMENT</span>
          <StatusBadge 
            status={isFollowed ? 'ENGAGEMENT VERIFIED' : 'ACTION REQUIRED'} 
            variant={isFollowed ? 'green' : 'red'} 
          />
        </div>
        <h3 className="twitter-card-title">X / TWITTER INTERACTION REQUIREMENT</h3>
        <p className="twitter-card-desc">
          To authenticate your presence and unlock archival submission clearance, you must engage with the official INKVIRE transmission on X: <strong>Like, comment, and repost (RT)</strong> the designated broadcast below.
        </p>
      </div>

      <div className="twitter-card-body">
        {/* Transmission Target Post Callout Box */}
        <div className="twitter-post-box">
          <div className="twitter-post-header">
            <div className="twitter-post-label">
              <span className="twitter-pulse-dot" aria-hidden="true"></span>
              <span>TARGET TRANSMISSION // STATUS #{targetPostId}</span>
            </div>
            <a 
              href={targetPostUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="twitter-post-external-link"
              onClick={() => setHasOpenedPost(true)}
            >
              VIEW ON X ↗
            </a>
          </div>

          <div className="twitter-tasks-list">
            <div className={`twitter-task-item ${isFollowed ? 'completed' : ''}`}>
              <div className="twitter-task-check">{isFollowed ? '✓' : '1'}</div>
              <div className="twitter-task-content">
                <strong>LIKE</strong>
                <span>Favorite the official post</span>
              </div>
            </div>
            <div className={`twitter-task-item ${isFollowed ? 'completed' : ''}`}>
              <div className="twitter-task-check">{isFollowed ? '✓' : '2'}</div>
              <div className="twitter-task-content">
                <strong>COMMENT</strong>
                <span>Leave your mark or response</span>
              </div>
            </div>
            <div className={`twitter-task-item ${isFollowed ? 'completed' : ''}`}>
              <div className="twitter-task-check">{isFollowed ? '✓' : '3'}</div>
              <div className="twitter-task-content">
                <strong>REPOST (RT)</strong>
                <span>Broadcast the signal to your feed</span>
              </div>
            </div>
          </div>

          {/* Quick Direct Intents Bar */}
          {!isFollowed && (
            <div className="twitter-intents-row">
              <button
                type="button"
                className="twitter-intent-pill"
                onClick={() => handleOpenIntent(likeIntentUrl)}
                title="Direct link to Like post"
              >
                ❤️ LIKE POST
              </button>
              <button
                type="button"
                className="twitter-intent-pill"
                onClick={() => handleOpenIntent(replyIntentUrl)}
                title="Direct link to Comment on post"
              >
                💬 COMMENT
              </button>
              <button
                type="button"
                className="twitter-intent-pill"
                onClick={() => handleOpenIntent(retweetIntentUrl)}
                title="Direct link to Repost (RT)"
              >
                🔁 REPOST (RT)
              </button>
            </div>
          )}
        </div>

        {/* Handle Input Field */}
        <div className="form-field" style={{ marginBottom: '16px', marginTop: '16px' }}>
          <label htmlFor="twitterHandle" className="form-label">
            <span>
              Your X / Twitter Handle
              <span className="form-label-required" aria-hidden="true">*</span>
            </span>
            {isFollowed && (
              <span style={{ color: 'var(--status-success)', fontSize: '11px', textTransform: 'uppercase' }}>
                [ ENGAGEMENT CONFIRMED ]
              </span>
            )}
          </label>
          <div className="twitter-input-wrapper">
            <span className="twitter-at-prefix" aria-hidden="true">@</span>
            <input
              id="twitterHandle"
              name="twitterHandle"
              type="text"
              value={cleanHandle}
              disabled={isFollowed}
              onChange={(e) => {
                onHandleChange(e.target.value.replace(/^@+/, '').trim());
                if (verificationError) setVerificationError(null);
              }}
              placeholder="username"
              className={`input-text twitter-handle-input ${displayError ? 'has-error' : ''}`}
              aria-invalid={Boolean(displayError)}
              autoCapitalize="none"
              autoCorrect="off"
            />
            {isFollowed && (
              <button
                type="button"
                className="btn-ghost"
                onClick={handleResetVerification}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '4px 8px', fontSize: '10px' }}
                title="Change X handle"
              >
                [ CHANGE ]
              </button>
            )}
          </div>
          <span className="form-helper-text">
            Required to verify your like, comment, and repost interactions against transmission #{targetPostId}.
          </span>
        </div>

        {/* Action Controls */}
        {!isFollowed ? (
          <div className="twitter-actions-grid">
            <button
              type="button"
              className={`btn ${hasOpenedPost ? 'btn-secondary' : 'btn-primary'} twitter-btn`}
              onClick={handleOpenPost}
            >
              <span>{hasOpenedPost ? `POST OPENED ↗` : `1. OPEN TRANSMISSION POST ↗`}</span>
            </button>

            <Button
              variant={hasOpenedPost ? 'primary' : 'secondary'}
              onClick={handleVerify}
              loading={isVerifying}
              disabled={isVerifying || !cleanHandle}
              className="twitter-btn"
            >
              {isVerifying ? 'CHECKING ENGAGEMENT...' : '2. VERIFY (LIKE, COMMENT & RT) ☩'}
            </Button>
          </div>
        ) : (
          <div className="twitter-verified-banner" role="status">
            <div className="verified-icon">✓</div>
            <div className="verified-details">
              <span className="verified-title">FREQUENCY SYNCHRONIZED</span>
              <span className="verified-subtitle">
                @{cleanHandle} certified: Liked, commented, and reposted transmission #{targetPostId}. Entry clearance unlocked.
              </span>
            </div>
          </div>
        )}

        {displayError && (
          <div className="form-error" role="alert" style={{ marginTop: '12px' }}>
            {displayError}
          </div>
        )}
      </div>
    </div>
  );
}
