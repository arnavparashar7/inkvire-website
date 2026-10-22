import React from 'react';
import { SectionHeader } from '../form/SectionHeader';
import { TextInput } from '../form/TextInput';
import { SelectField } from '../form/SelectField';
import { TwitterRequirement } from '../form/TwitterRequirement';

const DISCIPLINE_OPTIONS = [
  { value: 'illustration', label: 'Dark Illustration & Distressed Ink' },
  { value: 'editorial', label: 'Editorial Typography & Brutalist Design' },
  { value: 'sound', label: 'Dark Ambient Soundscape & Acoustic Composition' },
  { value: 'narrative', label: 'Gothic Narrative & Esoteric Lore' },
  { value: 'architecture', label: 'Spatial Architecture & Creative Development' }
];

export function IdentitySection({
  data,
  onChange,
  errors = {},
  status = 'CURRENT'
}) {
  return (
    <div className="section-container">
      <SectionHeader
        code="01 // IDENTITY"
        title="Entity Designation"
        description="Establish your archival identity, social transmission frequency, and coordinates. All marks attributed to your dossier are cryptographically indexed."
        status={status}
        variant={status === 'VALIDATED' ? 'green' : 'active'}
      />

      <TextInput
        id="callsign"
        name="callsign"
        label="Archival Callsign / Handle"
        value={data.callsign || ''}
        onChange={(e) => onChange('callsign', e.target.value)}
        placeholder="e.g. VALKYR-09"
        required
        error={errors.callsign}
        helper="Your permanent unique identity within the archive (3-32 characters)."
        maxLength={32}
      />

      <TextInput
        id="alias"
        name="alias"
        label="Editorial Display Alias"
        value={data.alias || ''}
        onChange={(e) => onChange('alias', e.target.value)}
        placeholder="e.g. K. Thorne"
        error={errors.alias}
        helper="Public-facing name or signature for curated exhibits."
        maxLength={48}
      />

      <TextInput
        id="email"
        name="email"
        type="email"
        label="Secure Transmission Channel (Email)"
        value={data.email || ''}
        onChange={(e) => onChange('email', e.target.value)}
        placeholder="transmission@domain.com"
        required
        error={errors.email}
        helper="Encrypted conduit for receiving entry verification and cipher keys."
      />

      {/* Mandatory X / Twitter Post Engagement Requirement (Like, Comment, RT) */}
      <TwitterRequirement
        handle={data.twitterHandle || ''}
        isFollowed={Boolean(data.isTwitterFollowed)}
        onHandleChange={(val) => onChange('twitterHandle', val)}
        onFollowVerified={(isVerified) => onChange('isTwitterFollowed', isVerified)}
        error={errors.twitter}
        targetAccount="INKVIRE"
        targetPostUrl="https://x.com/inkvire/status/2113269652054778298?s=20"
        targetPostId="2113269652054778298"
      />

      <SelectField
        id="discipline"
        name="discipline"
        label="Primary Archival Discipline"
        value={data.discipline || ''}
        onChange={(e) => onChange('discipline', e.target.value)}
        options={DISCIPLINE_OPTIONS}
        placeholder="Select your core discipline..."
        required
        error={errors.discipline}
        helper="Defines your primary catalog classification in the archive ledger."
      />
    </div>
  );
}

