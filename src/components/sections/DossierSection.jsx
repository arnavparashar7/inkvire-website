import React from 'react';
import { SectionHeader } from '../form/SectionHeader';
import { RadioGroup } from '../form/RadioGroup';
import { TextInput } from '../form/TextInput';
import { Textarea } from '../form/Textarea';

const CRAFT_DOMAINS = [
  { value: 'illustration', label: 'Illustration', code: 'DOM-01' },
  { value: 'editorial', label: 'Editorial', code: 'DOM-02' },
  { value: 'sound', label: 'Audio & Score', code: 'DOM-03' },
  { value: 'architecture', label: 'Architecture', code: 'DOM-04' },
  { value: 'narrative', label: 'Narrative', code: 'DOM-05' }
];

export function DossierSection({
  data,
  onChange,
  errors = {},
  status = 'CURRENT'
}) {
  return (
    <div className="section-container">
      <SectionHeader
        code="02 // DOSSIER"
        title="Archive Dossier & Intent"
        description="Detail your craft and articulate why your work belongs in the INKVIRE archive. Submissions without substantive intent are discarded."
        status={status}
        variant={status === 'VALIDATED' ? 'green' : 'active'}
      />

      <RadioGroup
        name="craftDomain"
        label="Operational Craft Domain"
        value={data.craftDomain || ''}
        onChange={(val) => onChange('craftDomain', val)}
        options={CRAFT_DOMAINS}
        required
        error={errors.craftDomain}
        helper="Select the primary domain through which your mark is executed."
      />

      <TextInput
        id="portfolioUrl"
        name="portfolioUrl"
        type="url"
        label="Public Folio / Archive URL"
        value={data.portfolioUrl || ''}
        onChange={(e) => onChange('portfolioUrl', e.target.value)}
        placeholder="https://archive.folio.io/specimens"
        error={errors.portfolioUrl}
        helper="Direct link to existing bodies of work, private indexes, or exhibitions."
      />

      <Textarea
        id="intentStatement"
        name="intentStatement"
        label="Statement of Intent & Archival Motive"
        value={data.intentStatement || ''}
        onChange={(e) => onChange('intentStatement', e.target.value)}
        placeholder="Articulate what marks you intend to etch into this archive, and why permanence matters to your work..."
        required
        error={errors.intentStatement}
        helper="Minimum 30 characters. Express your motive with clarity and restraint."
        rows={5}
        maxLength={800}
      />
    </div>
  );
}
