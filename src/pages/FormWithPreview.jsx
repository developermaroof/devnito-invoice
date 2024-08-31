import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const FormWithPreview = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyLogo: '',
    contractHeading: '',
    name: '',
    description: '',
    projectBudget: '',
    durationSoft: '',
    durationHard: '',
    startingDate: '',
    endingDescription: '',
    companyEmail: '',
    bannerAddress: '',
    bannerEmail: '',
    bannerWebsite: '',
    companyLogoFile: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const previewRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? URL.createObjectURL(files[0]) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current
  });

  return (
    <div className="p-6">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Company Logo:</label>
          <input
            type="file"
            name="companyLogo"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Contract Heading:</label>
          <input
            type="text"
            name="contractHeading"
            value={formData.contractHeading}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Project Budget in PKR:</label>
          <input
            type="number"
            name="projectBudget"
            value={formData.projectBudget}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Duration (Soft Deadline):</label>
          <input
            type="number"
            name="durationSoft"
            value={formData.durationSoft}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Duration (Hard Deadline):</label>
          <input
            type="number"
            name="durationHard"
            value={formData.durationHard}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Starting Date:</label>
          <input
            type="date"
            name="startingDate"
            value={formData.startingDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Ending Description:</label>
          <textarea
            name="endingDescription"
            value={formData.endingDescription}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Company Email:</label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Banner Address:</label>
          <input
            type="text"
            name="bannerAddress"
            value={formData.bannerAddress}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Banner Email:</label>
          <input
            type="email"
            name="bannerEmail"
            value={formData.bannerEmail}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Banner Website:</label>
          <input
            type="url"
            name="bannerWebsite"
            value={formData.bannerWebsite}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Live Preview:</h2>
        <div className="border p-4 rounded bg-gray-100" ref={previewRef}>
          <p><strong>Title:</strong> {formData.title}</p>
          {formData.companyLogo && (
            <div>
              <strong>Company Logo:</strong>
              <img src={formData.companyLogo} alt="Company Logo" className="mt-2" />
            </div>
          )}
          <p><strong>Contract Heading:</strong> {formData.contractHeading}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Project Budget in PKR:</strong> {formData.projectBudget}</p>
          <p><strong>Duration (Soft):</strong> {formData.durationSoft} days</p>
          <p><strong>Duration (Hard):</strong> {formData.durationHard} days</p>
          <p><strong>Starting Date:</strong> {formData.startingDate}</p>
          <p><strong>Ending Description:</strong> {formData.endingDescription}</p>
          <p><strong>Company Email:</strong> {formData.companyEmail}</p>
          <p><strong>Banner Address:</strong> {formData.bannerAddress}</p>
          <p><strong>Banner Email:</strong> {formData.bannerEmail}</p>
          <p><strong>Banner Website:</strong> {formData.bannerWebsite}</p>
          {formData.companyLogo && (
            <div>
              <strong>Company Logo:</strong>
              <img src={formData.companyLogo} alt="Company Logo" className="mt-2" />
            </div>
          )}
        </div>
      </div>

      {/* Popup for PDF download */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Form Submission</h3>
            <div className="border p-4 rounded bg-gray-100" ref={previewRef}>
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Contract Heading:</strong> {formData.contractHeading}</p>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Description:</strong> {formData.description}</p>
              <p><strong>Project Budget in PKR:</strong> {formData.projectBudget}</p>
              <p><strong>Duration (Soft):</strong> {formData.durationSoft} days</p>
              <p><strong>Duration (Hard):</strong> {formData.durationHard} days</p>
              <p><strong>Starting Date:</strong> {formData.startingDate}</p>
              <p><strong>Ending Description:</strong> {formData.endingDescription}</p>
              <p><strong>Company Email:</strong> {formData.companyEmail}</p>
              <p><strong>Banner Address:</strong> {formData.bannerAddress}</p>
              <p><strong>Banner Email:</strong> {formData.bannerEmail}</p>
              <p><strong>Banner Website:</strong> {formData.bannerWebsite}</p>
              {formData.companyLogo && (
                <div>
                  <strong>Company Logo:</strong>
                  <img src={formData.companyLogo} alt="Company Logo" className="mt-2" />
                </div>
              )}
            </div>
            <button
              onClick={handlePrint}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Download as PDF
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormWithPreview;
