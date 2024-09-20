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
      <div className="p-6 lg:py-20 2xl:max-w-screen-2xl 2xl:mx-auto">
        {/* Form Section */}
        <div>
          <h1 className='font-semibold text-center lg:text-2xl xl:text-3xl'>Add Invoice</h1>
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-8 lg:px-44 lg:mb-32">
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Title:</label>
              <input
                type="text"
                name="title"
                placeholder='Type title..'
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company Logo:</label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company Name:</label>
              <input
                type="text"
                name="companyLogoName"
                value={formData.companyLogoName}
                placeholder='Type company name..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Contract Heading:</label>
              <input
                type="text"
                name="contractHeading"
                placeholder='Type contact heading..'
                value={formData.contractHeading}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Name:</label>
              <input
                type="text"
                name="name"
                placeholder='Type name..'
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">1st Paragraph:</label>
              <textarea
                name="paragraph1"
                placeholder='Type something..'
                value={formData.paragraph1}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">2nd Paragraph:</label>
              <textarea
                name="paragraph2"
                placeholder='Type something..'
                value={formData.paragraph2}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">3rd Paragraph:</label>
              <textarea
                name="paragraph3"
                placeholder='Type something..'
                value={formData.paragraph3}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Project Budget:</label>
              <input
                type="text"
                name="projectBudget"
                placeholder='Put budget..'
                value={formData.projectBudget}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Duration (Soft Deadline):</label>
              <input
                type="text"
                name="durationSoft"
                placeholder='Type soft duration..'
                value={formData.durationSoft}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Duration (Hard Deadline):</label>
              <input
                type="text"
                name="durationHard"
                placeholder='Type hard duration..'
                value={formData.durationHard}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Starting Date:</label>
              <input
                type="text"
                name="startingDate"
                placeholder='Type starting date..'
                value={formData.startingDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Ending Description:</label>
              <textarea
                name="endingDescription"
                placeholder='Type ending message..'
                value={formData.endingDescription}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">CEO Name:</label>
              <input
                type="text"
                name="ceoName"
                placeholder='Type name..'
                value={formData.ceoName}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company Name:</label>
              <input
                type="text"
                name="companyName"
                placeholder='Type name..'
                value={formData.companyName}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">CEO Email:</label>
              <input
                type="email"
                name="ceoEmail"
                placeholder='Put email..'
                value={formData.ceoEmail}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company Address:</label>
              <input
                type="text"
                name="bannerAddress"
                placeholder='Type address..'
                value={formData.bannerAddress}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company Email:</label>
              <input
                type="email"
                name="bannerEmail"
                placeholder='Put email..'
                value={formData.bannerEmail}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company URL:</label>
              <input
                type="url"
                name="bannerWebsite"
                placeholder='Paste website URL..'
                value={formData.bannerWebsite}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl lg:mb-4"
                required
              />
            </div>
            <button type="submit" className="bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl">
              Add
            </button>
          </form>
        </div>
      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 lg:mb-12">Live Preview:</h2>
        <div className="border p-4 lg:py-6 rounded lg:mb-8" ref={previewRef}>
          <div className='bg-gray-100 p-2 md:p-4 lg:p-6 flex flex-col gap-10 lg:gap-14'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-semibold text-[0.6rem] sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-700'>{formData.title}</p>
              </div>
              <div className='flex items-center justify-center gap-[0.1rem]'>
                {formData.companyLogo && (
                <div className='flex items-center'>
                  <img src={formData.companyLogo} alt="Company Logo" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                </div>
                )}
                <p className='text-sm sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold'>{formData.companyLogoName}</p>
              </div>
            </div>
            <div>
              <p className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl'>{formData.contractHeading}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 lg:gap-4 mt-4 md:mt-8 text-[0.6rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>
            <p>Dear <span className='font-semibold'>{formData.name}</span>,</p>
            <p>{formData.paragraph1}</p>
            <p>{formData.paragraph2}</p>
            <p>{formData.paragraph3}</p>
          </div>
          <div className='flex flex-col lg:flex-row justify-between p-2 md:p-4 lg:p-8 xl:py-14 gap-2 lg:gap-4'>
            <div>
              <span className='text-xs sm:text-sm md:text-[1rem] xl:text-xl font-bold'>Project Budget</span>
              <p className='text-xs sm:text-sm md:text-[1rem] xl:text-xl pt-2'>{formData.projectBudget}</p>
            </div>
            <div className='border-l border-l-[0.2rem] pl-6'>
              <span className='text-xs sm:text-sm md:text-[1rem] xl:text-xl font-bold'>Duration</span>
              <li className='text-xs sm:text-sm md:text-[1rem] xl:text-xl lg:pl-2 lg:pt-2'>{formData.durationSoft} soft-deadline</li>
              <li className='text-xs sm:text-sm md:text-[1rem] xl:text-xl lg:pl-2'>{formData.durationHard} hard-deadline</li>
            </div>
            <div className='border-l border-l-[0.2rem] pl-6'>
              <span className='text-xs sm:text-sm md:text-[1rem] xl:text-xl font-bold'>Starting from</span>
              <li className='text-xs sm:text-sm md:text-[1rem] xl:text-xl lg:pl-2 lg:pt-2'>{formData.startingDate}</li>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-[0.6rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>{formData.endingDescription}</p>
          </div>
          <div className='mt-4 md:mt-8 xl:mt-14 flex flex-col gap-2'>
            <span className='text-xs sm:text-sm md:text-[1rem] lg:text-lg xl:text-xl'>Sincerely,</span>
            <div>
              <p className='text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>{formData.ceoName}</p>
              <p className='text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl font-bold italic'>Founder & CEO @{formData.companyName}</p>
              <p className='text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>{formData.ceoEmail}</p>
            </div>
          </div>
          <div className='flex border-y p-2 md:p-4 items-center justify-center mt-10 w-full h-full'>
            <div className='p-2 lg:px-6'>
              {formData.companyLogo && (
              <div className='flex items-center'>
                <img src={formData.companyLogo} alt="Company Logo" className="w-20 lg:w-32 xl:w-36 h-full" width={100} height={100} />
              </div>
              )}
            </div>
            <div className='flex flex-col border-l gap-2 pl-2 lg:pl-6 w-full overflow-scroll'>
              <p className='text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl'><span className='font-bold'>Address:</span> {formData.bannerAddress}</p>
              <p className='text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl'><span className='font-bold'>Email Address:</span> {formData.bannerEmail}</p>
              <p className='text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl'><span className='font-bold'>Website:</span> {formData.bannerWebsite}</p>
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