import React from 'react';
import PreviewContent from './PreviewContent';

const PreviewSection = ({ formData, previewRef }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 lg:mb-12">Live Preview:</h2>
      <div className="border p-4 lg:py-6 rounded lg:mb-8" ref={previewRef}>
        <PreviewContent formData={formData} />
      </div>
    </div>
  );
};

export default PreviewSection;
