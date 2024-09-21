import React, { useRef, useState } from 'react';
import PreviewSection from '../components/PreviewSection';
import PDFPopup from '../components/PDFPopup';
import Footer from '../components/Footer';
import { useReactToPrint } from 'react-to-print';
import Navbar from "../components/Navbar"


const AddInvoice = () => {
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
    ceoEmail: '',
    bannerAddress: '',
    bannerEmail: '',
    bannerWebsite: ''
  });
  
  const [showPopup, setShowPopup] = useState(false);
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="p-6 lg:py-20 2xl:max-w-screen-2xl 2xl:mx-auto">
      <div>
          <h1 className='font-semibold text-center lg:text-2xl xl:text-3xl'>Add Invoice</h1>
          <form className="space-y-4 lg:space-y-8 lg:px-44 lg:mb-32">
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Title:</label>
              <input
                type="text"
                name="title"
                placeholder='Type title..'
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
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">3rd Paragraph:</label>
              <textarea
                name="paragraph3"
                placeholder='Type something..'
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
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl lg:mb-4"
                required
              />
            </div>
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Contract Status:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contractStatus"
                  value="active"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl lg:mb-4"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">Completed</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contractStatus"
                  value="inactive"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl lg:mb-4"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">inProgress</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Payment Status:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="active"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl lg:mb-4"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">Pending</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="inactive"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl lg:mb-4"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">Paid</label>
              </div>
            </div>

            <button 
              type="button" onClick={(e) => { 
                e.preventDefault();
                setShowPopup(true);
              }} 
              className="bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl"
            >
              Preview
            </button>

          </form>
        </div>

        {/* Preview Section */}
        <PreviewSection formData={formData} previewRef={previewRef} />

        {/* Popup for PDF download */}
        {showPopup && (
          <PDFPopup
            formData={formData}
            handlePrint={handlePrint}
            setShowPopup={setShowPopup}
            previewRef={previewRef}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AddInvoice;
