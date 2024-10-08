import React from 'react';
import PreviewContent from './PreviewContent';

const PreviewSection = ({ formData, logoURL, previewRef }) => {
  return (
    <div className="lg:p-6"> {/* Adjust max-h as needed */}
      <h2 className="text-xl lg:text-center lg:text-2xl xl:text-3xl font-semibold mb-4 lg:mb-">Live Preview:</h2>
      <div className="p-4  max-w-3xl lg:max-h-[65rem] overflow-y-auto" ref={previewRef}>
        <PreviewContent formData={formData} logoURL={logoURL} />
      </div>
    </div>
  );
};

export default PreviewSection;
