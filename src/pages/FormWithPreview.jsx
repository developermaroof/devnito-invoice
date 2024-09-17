// src/pages/FormWithPreview.jsx
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FormWithPreview = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyLogo: '',
    companyLogoName: '',
    contractHeading: '',
    name: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    projectBudget: '',
    durationSoft: '',
    durationHard: '',
    startingDate: '',
    endingDescription: '',
    ceoName: '',
    companyName: '',
    ceoEmail:'',
    bannercompanyLogo: '',
    bannerAddress: '',
    bannerEmail: '',
    bannerWebsite: '',
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
    <>
      <Navbar />
      <div className="p-6">
        {/* Form Section */}
        <div>
          <h1 className='font-semibold text-center'>Add Invoice</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            placeholder='Type title..'
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
          <label className="block mb-1">Company Name:</label>
          <input
            type="text"
            name="companyLogoName"
            value={formData.companyLogoName}
            placeholder='Type company name..'
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contract Heading:</label>
          <input
            type="text"
            name="contractHeading"
            placeholder='Type contact heading..'
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
            placeholder='Type name..'
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">1st Paragraph:</label>
          <textarea
            name="paragraph1"
            placeholder='Type something..'
            value={formData.paragraph1}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">2nd Paragraph:</label>
          <textarea
            name="paragraph2"
            placeholder='Type something..'
            value={formData.paragraph2}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">3rd Paragraph:</label>
          <textarea
            name="paragraph3"
            placeholder='Type something..'
            value={formData.paragraph3}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Project Budget:</label>
          <input
            type="text"
            name="projectBudget"
            placeholder='Put budget..'
            value={formData.projectBudget}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Duration (Soft Deadline):</label>
          <input
            type="text"
            name="durationSoft"
            placeholder='Type soft duration..'
            value={formData.durationSoft}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Duration (Hard Deadline):</label>
          <input
            type="text"
            name="durationHard"
            placeholder='Type hard duration..'
            value={formData.durationHard}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Starting Date:</label>
          <input
            type="text"
            name="startingDate"
            placeholder='Type starting date..'
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
            placeholder='Type ending message..'
            value={formData.endingDescription}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">CEO Name:</label>
          <input
            type="text"
            name="ceoName"
            placeholder='Type name..'
            value={formData.ceoName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Company Name:</label>
          <input
            type="text"
            name="companyName"
            placeholder='Type name..'
            value={formData.companyName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">CEO Email:</label>
          <input
            type="email"
            name="ceoEmail"
            placeholder='Put email..'
            value={formData.ceoEmail}
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
          <label className="block mb-1">Company Address:</label>
          <input
            type="text"
            name="bannerAddress"
            placeholder='Type address..'
            value={formData.bannerAddress}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Company Email:</label>
          <input
            type="email"
            name="bannerEmail"
            placeholder='Put email..'
            value={formData.bannerEmail}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Company URL:</label>
          <input
            type="url"
            name="bannerWebsite"
            placeholder='Paste website URL..'
            value={formData.bannerWebsite}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white text-xs px-8 py-2 rounded-3xl">
              Add
            </button>
          </form>
      </div>
      {/* Preview Section */}
      <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Live Preview:</h2>
          <div className="border p-4 rounded" ref={previewRef}>
          <div className='bg-gray-100 p-2 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-semibold text-[0.6rem] text-gray-700'>{formData.title}</p>
              </div>
              <div className='flex items-center justify-center gap-[0.1rem]'>
                {formData.companyLogo && (
                <div className='flex items-center'>
                  <img src={formData.companyLogo} alt="Company Logo" className="w-4 h-4" />
                </div>
                )}
                <p className='text-sm font-bold'>{formData.companyLogoName}</p>
              </div>
            </div>
            <div>
              <p className='text-center font-semibold text-2xl'>{formData.contractHeading}</p>
            </div>
          </div>

          <p>{formData.name}</p>
          <p>{formData.paragraph1}</p>
          <p>{formData.paragraph2}</p>
          <p>{formData.paragraph3}</p>
          <p>{formData.projectBudget}</p>
          <p>{formData.durationSoft}</p>
          <p>{formData.durationHard}</p>
          <p>{formData.startingDate}</p>
          <p>{formData.endingDescription}</p>
          <p>{formData.ceoName}</p>
          <p>{formData.companyName}</p>
          <p>{formData.ceoEmail}</p>
          <p>{formData.bannerAddress}</p>
          <p>{formData.bannerEmail}</p>
          <p>{formData.bannerWebsite}</p>
          {formData.bannercompanyLogo && (
            <div>
              <img src={formData.bannercompanyLogo} alt="Company Logo" className="mt-2" />
            </div>
          )}
        </div>
      </div>

      {/* Popup for PDF download */}
      {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Form Submission</h3>
              <div className="border p-4 rounded" ref={previewRef}>
          <div className='bg-gray-100 p-2 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-semibold text-[0.6rem] text-gray-700'>{formData.title}</p>
              </div>
              <div className='flex items-center justify-center gap-[0.1rem]'>
                {formData.companyLogo && (
                <div className='flex items-center'>
                  <img src={formData.companyLogo} alt="Company Logo" className="w-4 h-4" />
                </div>
                )}
                <p className='text-sm font-bold'>{formData.companyLogoName}</p>
              </div>
            </div>
            <div>
              <p className='text-center font-semibold text-2xl'>{formData.contractHeading}</p>
            </div>
          </div>

          <p>{formData.name}</p>
          <p>{formData.paragraph1}</p>
          <p>{formData.paragraph2}</p>
          <p>{formData.paragraph3}</p>
          <p>{formData.projectBudget}</p>
          <p>{formData.durationSoft}</p>
          <p>{formData.durationHard}</p>
          <p>{formData.startingDate}</p>
          <p>{formData.endingDescription}</p>
          <p>{formData.ceoName}</p>
          <p>{formData.companyName}</p>
          <p>{formData.ceoEmail}</p>
          <p>{formData.bannerAddress}</p>
          <p>{formData.bannerEmail}</p>
          <p>{formData.bannerWebsite}</p>
          {formData.bannercompanyLogo && (
            <div>
              <img src={formData.bannercompanyLogo} alt="Company Logo" className="mt-2" />
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
      <Footer />
    </>
  );
};

export default FormWithPreview;