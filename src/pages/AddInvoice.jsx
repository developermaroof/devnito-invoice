import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

// Components
import Footer from '../components/Footer';
import PDFPopup from '../components/PDFPopup';
import Navbar from "../components/Navbar";
import PreviewSection from '../components/PreviewSection';

// Firebase
import { db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddInvoice = () => {
  const initialFormState = { 
    title: '',
    companyLogo: null,
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
    bannerWebsite: '',
    contractStatus: '',
    paymentStatus: '',
    clientDetails: '',
    assigneeDetails: '',
    notes: '',
  };

  const validateForm = () => {
    // List all required fields here
    const requiredFields = [
      'title',
    ];
  
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the required field: ${field}`);
        return false;
      }
    }
  
    return true;
  };
  

  const [formData, setFormData] = useState(initialFormState);
  const [savedFormData, setSavedFormData] = useState(initialFormState); // New state for holding saved form data

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'companyLogo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddInvoice = async () => {

      // Validate form data
  if (!validateForm()) {
    // If the form is invalid, stop the function execution
    return;
  }

    try {
      let logoUrl = '';

      // Upload the company logo to Firebase Storage
      if (formData.companyLogo) {
        const storageRef = ref(storage, `logos/${formData.companyLogo.name}`);
        await uploadBytes(storageRef, formData.companyLogo);
        logoUrl = await getDownloadURL(storageRef);
      }

      // Prepare the invoice data
      const invoiceData = {
        ...formData,
        companyLogo: logoUrl, // Use the URL from storage
      };

      // Save the form data to Firestore
      const docRef = await addDoc(collection(db, 'invoices'), invoiceData);
      console.log("Document written with ID: ", docRef.id);
    
      
      // Show the popup with saved data
      setSavedFormData(invoiceData); // Set the saved data to be displayed in popup
      setShowPopup(true);
      
      // Reset form data if needed
      setFormData(initialFormState);
      
    // Delay the navigation to /invoicelist after showing the popup
      setTimeout(() => {
        navigate('/invoicelist');    
      },  6000); // Adjust the delay time (in milliseconds) to how long the modal should remain visible
    
    } catch (error) {
      console.error("Error adding document: ", error.message);
      alert(`Error adding invoice: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 lg:py-20 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div>
          <h1 className='font-semibold text-center lg:text-2xl xl:text-3xl'>Add Invoice</h1>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 lg:space-y-8 lg:px-44 lg:mb-32">
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Assignee Details:</label>
              <textarea
                name="assigneeDetails"
                value={formData.assigneeDetails}
                placeholder='Type Something..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Banner Address:</label>
              <input
                type="text"
                name="bannerAddress"
                value={formData.bannerAddress}
                placeholder='Type address..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Banner Email:</label>
              <input
                type="email"
                name="bannerEmail"
                value={formData.bannerEmail}
                placeholder='Put email..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Banner Website:</label>
              <input
                type="url"
                name="bannerWebsite"
                value={formData.bannerWebsite}
                placeholder='Paste website URL..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">CEO Email:</label>
              <input
                type="email"
                name="ceoEmail"
                value={formData.ceoEmail}
                placeholder='Put email..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">CEO Name:</label>
              <input
                type="text"
                name="ceoName"
                value={formData.ceoName}
                placeholder='Type name..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Client Details:</label>
              <textarea
                name="clientDetails"
                value={formData.clientDetails}
                placeholder='Type Something..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
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
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                placeholder='Type company name..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Contract Heading:</label>
              <input
                type="text"
                name="contractHeading"
                value={formData.contractHeading}
                placeholder='Type contract heading..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Contract Status:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contractStatus"
                  value="Completed"
                  checked={formData.contractStatus === "Completed"}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">Completed</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contractStatus"
                  value="inProgress"
                  checked={formData.contractStatus === "inProgress"}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">In Progress</label>
              </div>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Duration (Hard Deadline):</label>
              <input
                type="text"
                name="durationHard"
                value={formData.durationHard}
                placeholder='Type hard deadline..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Duration (Soft Deadline):</label>
              <input
                type="text"
                name="durationSoft"
                value={formData.durationSoft}
                placeholder='Type soft deadline..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Ending Description:</label>
              <textarea
                name="endingDescription"
                value={formData.endingDescription}
                placeholder='Type ending message..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder='Type name..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Notes:</label>
              <textarea
                name="notes"
                value={formData.notes}
                placeholder='Type any notes..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Paragraph 1:</label>
              <textarea
                name="paragraph1"
                value={formData.paragraph1}
                placeholder='Type paragraph 1..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Paragraph 2:</label>
              <textarea
                name="paragraph2"
                value={formData.paragraph2}
                placeholder='Type paragraph 2..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Paragraph 3:</label>
              <textarea
                name="paragraph3"
                value={formData.paragraph3}
                placeholder='Type paragraph 3..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Payment Status:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Pending"
                  checked={formData.paymentStatus === "Pending"}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">Pending</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Paid"
                  checked={formData.paymentStatus === "Paid"}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl"
                />
                <label className="ml-2 lg:text-lg xl:text-xl">Paid</label>
              </div>
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Project Budget:</label>
              <input
                type="text"
                name="projectBudget"
                value={formData.projectBudget}
                placeholder='Put project budget..'
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Starting from:</label>
              <input
                type="date"
                name="startingDate"
                value={formData.startingDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <div>
              <label className="block mb-1 lg:text-xl xl:text-2xl">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder='Type title..'
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
              />
            </div>
            {/*  */}
            <button
            type="submit" 
            onClick={handleAddInvoice} 
            className="bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl"
            >
            Add Invoice
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <PreviewSection formData={formData} previewRef={previewRef} />

        {/* Popup for PDF download */}
        {showPopup && (
          <PDFPopup
          formData={savedFormData} // Pass the saved data to the popup
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