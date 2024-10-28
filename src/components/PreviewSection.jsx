import React from 'react';
import PreviewContent from './PreviewContent';

const PreviewSection = ({ formData, logoURL, previewRef }) => {
  return (
    <div className="lg:p-6  bg-white">
      <div className="p-4 shadow-lg max-w-3xl lg:max-h-[80vh] lg:min-h-auto overflow-y-auto" ref={previewRef}>
        <PreviewContent formData={formData} logoURL={logoURL} />
      </div>
    </div>
  );
};

export default PreviewSection;
