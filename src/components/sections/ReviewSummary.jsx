import React from 'react';
import { SectionHeader } from '../form/SectionHeader';

export function ReviewSummary({
  data,
  onEditSection
}) {
  return (
    <div className="section-container">
      <SectionHeader
        code="05 // VERIFICATION"
        title="Dossier Review & Dispatch"
        description="Verify your transmission data before sealing the packet. Once dispatched, cryptographic hash indexing commences."
        status="READY"
        variant="active"
      />

      <div className="review-dossier-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-red)', letterSpacing: '0.1em' }}>
            01 // IDENTIFICATION
          </span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => onEditSection(1)}
            aria-label="Edit section 01"
          >
            [ EDIT ]
          </button>
        </div>
        <div className="review-item">
          <span className="review-key">Archival Callsign</span>
          <span className="review-val">{data.callsign || '—'}</span>
        </div>
        <div className="review-item">
          <span className="review-key">Editorial Alias</span>
          <span className="review-val">{data.alias || '—'}</span>
        </div>
        <div className="review-item">
          <span className="review-key">Transmission Channel</span>
          <span className="review-val">{data.email || '—'}</span>
        </div>
        <div className="review-item">
          <span className="review-key">X / Twitter Engagement</span>
          <span className="review-val">
            {data.twitterHandle ? `@${data.twitterHandle.replace(/^@+/, '')}` : '—'}
            {data.isTwitterFollowed && (
              <span style={{ color: 'var(--status-success)', marginLeft: '10px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                [ ✓ LIKED, COMMENTED & RT ]
              </span>
            )}
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
              TRANSMISSION POST #2113269652054778298
            </div>
          </span>
        </div>
        <div className="review-item">
          <span className="review-key">Discipline</span>
          <span className="review-val">{data.discipline || '—'}</span>
        </div>
      </div>

      <div className="review-dossier-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-red)', letterSpacing: '0.1em' }}>
            02 // CRAFT & MOTIVE
          </span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => onEditSection(2)}
            aria-label="Edit section 02"
          >
            [ EDIT ]
          </button>
        </div>
        <div className="review-item">
          <span className="review-key">Craft Domain</span>
          <span className="review-val">{data.craftDomain ? data.craftDomain.toUpperCase() : '—'}</span>
        </div>
        <div className="review-item">
          <span className="review-key">Folio Archive</span>
          <span className="review-val">{data.portfolioUrl || '—'}</span>
        </div>
        <div className="review-item">
          <span className="review-key">Statement of Intent</span>
          <span className="review-val" style={{ fontStyle: 'italic', fontSize: '13px' }}>
            "{data.intentStatement || '—'}"
          </span>
        </div>
      </div>

      <div className="review-dossier-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-red)', letterSpacing: '0.1em' }}>
            03 // TRANSMISSION SPECIMEN
          </span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => onEditSection(3)}
            aria-label="Edit section 03"
          >
            [ EDIT ]
          </button>
        </div>
        <div className="review-item">
          <span className="review-key">Attached File</span>
          <span className="review-val">
            {data.artifactFile ? `${data.artifactFile.name} (${(data.artifactFile.size / 1024).toFixed(1)} KB)` : 'None attached'}
          </span>
        </div>
        {data.artifactUrl && (
          <div className="review-item">
            <span className="review-key">External Specimen URL</span>
            <span className="review-val">{data.artifactUrl}</span>
          </div>
        )}
        {data.artifactNotes && (
          <div className="review-item">
            <span className="review-key">Material Notes</span>
            <span className="review-val">{data.artifactNotes}</span>
          </div>
        )}
      </div>

      <div className="review-dossier-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-red)', letterSpacing: '0.1em' }}>
            04 // ATTESTATIONS
          </span>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => onEditSection(4)}
            aria-label="Edit section 04"
          >
            [ EDIT ]
          </button>
        </div>
        <div className="review-item">
          <span className="review-key">Permanence Covenant</span>
          <span className="review-val" style={{ color: 'var(--status-success)' }}>
            ✓ ACKNOWLEDGED & ACCEPTED
          </span>
        </div>
        <div className="review-item">
          <span className="review-key">Origin Attestation</span>
          <span className="review-val" style={{ color: 'var(--status-success)' }}>
            ✓ CERTIFIED ORIGINAL WORK
          </span>
        </div>
      </div>
    </div>
  );
}
