import React from 'react';
import PreviewContent from './PreviewContent';

const PreviewSection = ({ formData, logoURL, previewRef }) => {
  return (
    <div className="max-w-full">
      <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 lg:mb-12">Live Preview:</h2>
      <div className="border border-yellow-500 p-4 lg:p-6 rounded shadow-md" ref={previewRef}>
        <PreviewContent formData={formData} logoURL={logoURL} />
      </div>
    </div>
  );
};

export default PreviewSection;
