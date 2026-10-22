import React from 'react';
import { SectionHeader } from '../form/SectionHeader';
import { FileUpload } from '../form/FileUpload';
import { TextInput } from '../form/TextInput';
import { Textarea } from '../form/Textarea';

export function ArtifactSection({
  data,
  onChange,
  errors = {},
  status = 'CURRENT'
}) {
  return (
    <div className="section-container">
      <SectionHeader
        code="03 // TRANSMISSION"
        title="Artifact Specimen"
        description="Transmit a tangible specimen of your work. You may upload a direct artifact file (image, manuscript, audio fragment) or link to a verified external repository."
        status={status}
        variant={status === 'VALIDATED' ? 'green' : 'active'}
      />

      <FileUpload
        id="artifact-file"
        label="Specimen File Upload"
        file={data.artifactFile}
        onFileSelect={(file) => onChange('artifactFile', file)}
        onFileRemove={() => onChange('artifactFile', null)}
        error={errors.artifact}
      />

      <TextInput
        id="artifactUrl"
        name="artifactUrl"
        type="url"
        label="Or Specimen Repository Link"
        value={data.artifactUrl || ''}
        onChange={(e) => onChange('artifactUrl', e.target.value)}
        placeholder="https://repository.domain/specimen-record"
        error={errors.artifactUrl}
        helper="Alternative or companion link to a hosted specimen, vector plate, or audio reel."
      />

      <Textarea
        id="artifactNotes"
        name="artifactNotes"
        label="Specimen Context & Material Notes"
        value={data.artifactNotes || ''}
        onChange={(e) => onChange('artifactNotes', e.target.value)}
        placeholder="Document tools, medium (e.g. distressed sumi ink, 35mm scan, analog synthesizer), or contextual lore..."
        helper="Supplementary notes assisting the archive curatorial review."
        rows={3}
        maxLength={400}
      />
    </div>
  );
}
