import React from 'react';
import { SectionHeader } from '../form/SectionHeader';
import { Checkbox } from '../form/Checkbox';

export function CovenantSection({
  data,
  onChange,
  errors = {},
  status = 'CURRENT'
}) {
  return (
    <div className="section-container">
      <SectionHeader
        code="04 // COVENANT"
        title="Declarations & Protocol"
        description="Entry into INKVIRE requires conscious submission to our archival covenant. Review and seal your declarations."
        status={status}
        variant={status === 'VALIDATED' ? 'green' : 'active'}
      />

      <Checkbox
        id="covenantPermanence"
        name="covenantPermanence"
        checked={Boolean(data.covenantPermanence)}
        onChange={(e) => onChange('covenantPermanence', e.target.checked)}
        label="Covenant of Archival Permanence"
        description="I understand and accept that once accepted, entries and marks are indexed into the immutable public archive."
        required
        error={errors.covenantPermanence}
      />

      <Checkbox
        id="covenantAuthenticity"
        name="covenantAuthenticity"
        checked={Boolean(data.covenantAuthenticity)}
        onChange={(e) => onChange('covenantAuthenticity', e.target.checked)}
        label="Attestation of Craft & Origin"
        description="I attest under digital seal that all materials, words, and specimens submitted originate from authentic personal craft."
        required
        error={errors.covenantAuthenticity}
      />

      <Checkbox
        id="covenantDispatch"
        name="covenantDispatch"
        checked={Boolean(data.covenantDispatch)}
        onChange={(e) => onChange('covenantDispatch', e.target.checked)}
        label="Curatorial Dispatch Channel"
        description="Authorize INKVIRE to dispatch cryptographic cipher codes and verification status to your designated email channel."
      />
    </div>
  );
}
