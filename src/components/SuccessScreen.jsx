import React, { useState } from 'react';
import { Button } from './form/Button';

export function SuccessScreen({
  receipt,
  onReset
}) {
  const [copied, setCopied] = useState(false);

  const copyReceipt = () => {
    if (!receipt) return;
    const text = `INKVIRE ARCHIVE TRANSMISSION RECEIPT\n` +
      `------------------------------------\n` +
      `RECORD ID : ${receipt.recordId}\n` +
      `HASH      : ${receipt.receiptHash}\n` +
      `TIMESTAMP : ${receipt.timestamp}\n` +
      `CALLSIGN  : ${receipt.applicantCallsign}\n` +
      `X CONDUIT : ${receipt.twitterConduit || 'NOT_BOUND'}\n` +
      `POST TASK : LIKED, COMMENTED & RT (#2113269652054778298)\n` +
      `STATUS    : INGESTION COMPLETE\n`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="form-panel-card success-card">
      <div className="success-seal">
        <img src="/inkvire-avatar.png" alt="INKVIRE Archive Seal" />
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-red)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
        [ TRANSMISSION ACCEPTED ]
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.04em' }}>
        MARK RECORDED.
      </h2>

      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
        Your dossier has been encoded into the archive ingestion queue. The INKVIRE curatorial council reviews records at each lunar cycle.
      </p>

      <div className="success-code-box">
        <div className="success-code-label">ARCHIVE DOSSIER TOKEN</div>
        <div className="success-code-value">{receipt?.recordId || 'INK-2026-X89B'}</div>
        <div className="success-timestamp">
          RECEIPT HASH: {receipt?.receiptHash || '0x9E4B2F71A80C'}
        </div>
        {receipt?.twitterConduit && (
          <div className="success-timestamp" style={{ color: 'var(--status-success)' }}>
            X CONDUIT: {receipt.twitterConduit} (LIKED, COMMENTED & RT #2113269652054778298)
          </div>
        )}
        <div className="success-timestamp">
          DISPATCHED: {receipt?.timestamp ? new Date(receipt.timestamp).toUTCString() : new Date().toUTCString()}
        </div>
      </div>

      <div style={{ margin: '14px 0 28px 0', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
        {receipt?.simulated 
          ? 'Notice: Local simulation boundary active. Transmission validated and parsed successfully.'
          : 'Official record sealed. Keep this token for status verification.'}
      </div>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="secondary" onClick={copyReceipt}>
          {copied ? '✓ TOKEN COPIED' : 'COPY ARCHIVE RECEIPT'}
        </Button>
        <Button variant="primary" onClick={onReset}>
          RETURN TO ARCHIVE
        </Button>
      </div>
    </div>
  );
}
