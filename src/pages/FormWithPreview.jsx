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
            type="text"
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
          <div className='flex flex-col gap-2 mt-4 text-[0.6rem]'>
            <p>Dear <span className='font-semibold'>{formData.name}</span>,</p>
            <p>{formData.paragraph1}</p>
            <p>{formData.paragraph2}</p>
            <p>{formData.paragraph3}</p>
          </div>
          <div className='flex flex-col p-2 gap-2'>
            <div>
              <span className='text-xs font-bold'>Project Budget</span>
              <p className='text-xs'>{formData.projectBudget}</p>
            </div>
            <div>
              <span className='text-xs font-bold'>Duration</span>
              <li className='text-xs'>{formData.durationSoft} soft-deadline</li>
              <li className='text-xs'>{formData.durationHard} hard-deadline</li>
            </div>
            <div>
              <span className='text-xs font-bold'>Starting from</span>
              <li className='text-xs'>{formData.startingDate}</li>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-[0.6rem]'>{formData.endingDescription}</p>
          </div>
          <div className='mt-4 flex flex-col gap-2'>
            <span className='text-xs'>Sincerely,</span>
            <div>
              <p className='text-[0.7rem]'>{formData.ceoName}</p>
              <p className='text-[0.7rem] font-bold italic'>Founder & CEO @{formData.companyName}</p>
              <p className='text-[0.7rem]'>{formData.ceoEmail}</p>
            </div>
          </div>
          <div className='flex border-t border-b p-2 items-center justify-center mt-10 w-full h-full'>
            <div className='border-r p-2'>
              {formData.companyLogo && (
              <div className='flex items-center'>
                <img src={formData.companyLogo} alt="Company Logo" className="w-20 h-full" width={100} height={100} />
              </div>
              )}
            </div>
            <div className='flex flex-col gap-2 pl-2'>
              <p className='text-[0.7rem]'><span className='font-bold'>Address:</span> {formData.bannerAddress}</p>
              <p className='text-[0.7rem]'><span className='font-bold'>Email Address:</span> {formData.bannerEmail}</p>
              <p className='text-[0.7rem]'><span className='font-bold'>Website:</span> {formData.bannerWebsite}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for PDF download */}
      {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Submission</h3>
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
          <div className='flex flex-col gap-2 mt-4 text-[0.6rem]'>
            <p>Dear <span className='font-semibold'>{formData.name}</span>,</p>
            <p>{formData.paragraph1}</p>
            <p>{formData.paragraph2}</p>
            <p>{formData.paragraph3}</p>
          </div>
          <div className='flex flex-col p-2 gap-2'>
            <div>
              <span className='text-xs font-bold'>Project Budget</span>
              <p className='text-xs'>{formData.projectBudget}</p>
            </div>
            <div>
              <span className='text-xs font-bold'>Duration</span>
              <li className='text-xs'>{formData.durationSoft} soft-deadline</li>
              <li className='text-xs'>{formData.durationHard} hard-deadline</li>
            </div>
            <div>
              <span className='text-xs font-bold'>Starting from</span>
              <li className='text-xs'>{formData.startingDate}</li>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-[0.6rem]'>{formData.endingDescription}</p>
          </div>
          <div className='mt-4 flex flex-col gap-2'>
            <span className='text-xs'>Sincerely,</span>
            <div>
              <p className='text-[0.7rem]'>{formData.ceoName}</p>
              <p className='text-[0.7rem] font-bold italic'>Founder & CEO @{formData.companyName}</p>
              <p className='text-[0.7rem]'>{formData.ceoEmail}</p>
            </div>
          </div>
          <div className='flex border-t border-b p-2 items-center justify-center mt-10'>
            <div className='border-r p-2'>
              {formData.companyLogo && (
              <div className='flex items-center'>
                <img src={formData.companyLogo} alt="Company Logo" className="" width={100} height={100} />
              </div>
              )}
            </div>
            <div className='flex flex-col gap-2 pl-2'>
              <p className='text-[0.7rem]'><span className='font-bold'>Address:</span> {formData.bannerAddress}</p>
              <p className='text-[0.7rem]'><span className='font-bold'>Email Address:</span> {formData.bannerEmail}</p>
              <p className='text-[0.7rem]'><span className='font-bold'>Website:</span> {formData.bannerWebsite}</p>
            </div>
          </div>
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