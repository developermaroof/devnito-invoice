import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { UserCircleIcon } from '@heroicons/react/24/solid'
// Css File
import "../App.css";

// Components
import PDFPopup from '../components/PDFPopup';
import PreviewSection from '../components/PreviewSection';

// Firebase
import { auth, db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
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
    deadline: '',
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

  const [formData, setFormData] = useState(initialFormState);
  const [savedFormData, setSavedFormData] = useState(initialFormState);
  const [showPopup, setShowPopup] = useState(false);
  const previewRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // New state variable for fixed position
  const [logoURL, setLogoURL] = useState(null); // New state for logo URL
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [isFormDisabled, setIsFormDisabled] = useState(false); // State for disabling form

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar
    setIsFormDisabled(!isSidebarOpen); // Toggle form disabled state
  };
    // Scroll event handler
    const handleScroll = () => {
      if (window.scrollY > 200) { // Adjust the scroll pixel threshold as needed
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

  useEffect(() => {
    if (location.state && location.state.invoice) {
      setFormData(location.state.invoice);
      setIsEditing(true);
    }
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
      return () => {
        // Cleanup event listener on unmount
        window.removeEventListener('scroll', handleScroll);
      };
    }, [location.state]);

  const validateForm = () => {
    const requiredFields = ['title'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the required field: ${field}`);
        return false;
      }
    }
    return true;
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'companyLogo') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Create a URL for the uploaded logo
      const fileURL = URL.createObjectURL(file);
      setLogoURL(fileURL); // Set the logo URL
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddInvoice = async () => {
    if (!validateForm()) {
        return; // Validate the form before proceeding
    }

    try {
        const user = auth.currentUser; // Get the current user
        if (!user) {
            alert('You must be logged in to add an invoice.'); // Alert if user is not logged in
            return;
        }
        console.log('Current User UID:', user.uid); // Log the UID

        let logoUrl = '';

        if (formData.companyLogo) {
            // If a new logo is being uploaded
            const storageRef = ref(storage, `logos/${formData.companyLogo.name}`);
            await uploadBytes(storageRef, formData.companyLogo);
            logoUrl = await getDownloadURL(storageRef); // Get the logo URL
        } else if (isEditing) {
            // If editing, keep the existing logo
            logoUrl = formData.companyLogo;
        }

        // Prepare the invoice data, including user ID
        const invoiceData = {
            ...formData,
            companyLogo: logoUrl,
            userId: user.uid, // Add the UID of the user to the invoice data
        };

        if (isEditing) {
            // Update logic
            const invoiceId = location.state.invoice.id; // Get the ID of the invoice to update
            await updateDoc(doc(db, 'invoices', invoiceId), invoiceData);
            console.log("Document updated with ID: ", invoiceId);
        } else {
            // Add new invoice
            await addDoc(collection(db, 'invoices'), invoiceData);
            console.log("Document written with ID: ", invoiceData.id);
        }

        setSavedFormData(invoiceData); // Save the form data
        setShowPopup(true); // Show a popup to indicate success
        setFormData(initialFormState); // Reset the form data
        setLogoURL(logoUrl); // Reset logo URL after submission

        // Navigate to the invoice list after a delay
        setTimeout(() => {
            navigate('/invoicelist');    
        }, 6000);

    } catch (error) {
        console.error("Error adding document: ", error.message);
        alert(`Error adding invoice: ${error.message}`);
    }
};

  return (
    <>
      <div className="flex flex-1 flex-col lg:pl-64 ">
        <main className="flex-1 pb-8">
          <div className="p-6 lg:py-20 2xl:max-w-screen-2xl 2xl:mx-auto relative">
            <div className='lg:flex lg:w-[100%]'>
              <div className='lg:w-[50%] mb-10 lg:mb-0'>
                <h1 className="hidden lg:block font-semibold text-center lg:text-2xl xl:text-3xl">
                  Add Contract
                </h1>
                {/* Mobile/Tebs */}
                <div className='flex justify-between mb-10 lg:hidden'>
                  <div>
                    <h1 className='font-semibold text-center'>Add Contract</h1>
                  </div>
                  {/* Hamburger Menu Button */}
                  <div>
                    <div
                      onClick={handleToggleSidebar}
                      className="flex items-center"
                    >
                      <FaEye className="text-black text-xl" />
                      <button className="font-semibold text-center px-1">
                        Preview
                      </button>
                    </div>
                    {/* Sidebar for Preview Section */}
                    <div
                      style={{ right: isSidebarOpen ? '0' : '-93vw' }}
                      className="max-w-[93vw] min-w-[93vw] p-4 h-full fixed top-0 bg-white z-[50] overflow-y-auto transition-all duration-500 shadow-lg border-2"
                    >
                      <div className='flex justify-end sticky top-2 mr-2 z-50'>
                        <button
                          className="bg-transparent border-none text-2xl cursor-pointer"
                          onClick={handleToggleSidebar}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                        <PreviewSection formData={formData} logoURL={logoURL} previewRef={previewRef}/>
                    </div>
                  </div>
                </div>
                {/* Mobile/Tebs */}
                {/* form from */}
                <form onSubmit={(e) => e.preventDefault()} className=" lg:px-4">
                  <div className="space-y-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      {/* //    --------------------------Title-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="title" className="requiredStar block text-sm/6 font-medium text-gray-900">
                          Title
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="title"
                            autoComplete="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Name-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="name"
                            autoComplete="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Contract Heading-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="contractheading" className="block text-sm/6 font-medium text-gray-900">
                          Contract Heading
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="contractHeading"
                            value={formData.contractHeading}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="contractHeading"
                            autoComplete="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Company Logo-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="companylogo" className="block text-sm font-medium text-gray-900">
                          Company Logo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                          {!logoURL ? (
                            <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                          ) : (
                            <img src={logoURL} alt="Selected Logo" className="h-12 w-12 object-contain rounded-full" />
                          )}
                          <input
                            type="file"
                            name="companyLogo"
                            accept="image/*"
                            onChange={handleChange}
                            disabled={isFormDisabled}
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Paragraph 1-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="paragraph1" className="block text-sm/6 font-medium text-gray-900">
                          Paragraph 1
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="paragraph1"
                            value={formData.paragraph1}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="paragraph1"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Paragraph 2-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="paragraph2" className="block text-sm/6 font-medium text-gray-900">
                          Paragraph 2
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="paragraph2"
                            value={formData.paragraph2}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="paragraph2"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Paragraph 3-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="paragraph3" className="block text-sm/6 font-medium text-gray-900">
                          Paragraph 3
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="paragraph3"
                            value={formData.paragraph3}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="paragraph3"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Project Budget-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="projectBudget" className="block text-sm/6 font-medium text-gray-900">
                          Project Budget
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="projectBudget"
                            value={formData.projectBudget}                            
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="projectBudget"
                            autoComplete="projectBudget"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Duration (Soft Deadline)-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="durationSoft" className="block text-sm/6 font-medium text-gray-900">
                          Duration (Soft Deadline)
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="durationSoft"
                            value={formData.durationSoft}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="durationSoft"
                            autoComplete="durationSoft"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Duration (Hard Deadline)-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="durationHard" className="block text-sm/6 font-medium text-gray-900">
                          Duration (Hard Deadline)
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="durationHard"
                            value={formData.durationHard}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="durationHard"
                            autoComplete="durationHard"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Starting Date-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="startingDate" className="block text-sm/6 font-medium text-gray-900">
                          Starting Date
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            name="startingDate"
                            value={formData.startingDate}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="startingDate"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Ending Paragraph-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="endingDescription" className="block text-sm/6 font-medium text-gray-900">
                          Ending Paragraph
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="endingDescription"
                            value={formData.endingDescription}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="endingDescription"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Company Ceo Name-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="ceoName" className="block text-sm/6 font-medium text-gray-900">
                          Company Ceo Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="ceoName"
                            value={formData.ceoName}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="ceoName"
                            autoComplete="ceoName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Company Name-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="companyName" className="block text-sm/6 font-medium text-gray-900">
                          Company Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="companyName"
                            autoComplete="companyName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Email address-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="ceoEmail" className="block text-sm/6 font-medium text-gray-900">
                          Ceo Email Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name="ceoEmail"
                            value={formData.ceoEmail}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="ceoEmail"
                            autoComplete="ceoEmail"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Address on Banner-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="bannerAddress" className="block text-sm/6 font-medium text-gray-900">
                          Address on Banner
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="bannerAddress"
                            value={formData.bannerAddress}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="bannerAddress"
                            autoComplete="bannerAddress"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Email Address on Banner-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="bannerEmail" className="block text-sm/6 font-medium text-gray-900">
                          Email Address on Banner
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name="bannerEmail"
                            value={formData.bannerEmail}
                            onChange={handleChange}
                            disabled={isFormDisabled}
                            id="bannerEmail"
                            autoComplete="bannerEmail"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Email Address on Banner-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="bannerWebsite" className="block text-sm/6 font-medium text-gray-900">
                          Website on Banner
                        </label>
                        <div className="mt-2">
                          <input
                            type="url"
                            name="bannerWebsite"
                            value={formData.bannerWebsite}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="bannerWebsite"
                            autoComplete="bannerWebsite"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Deadline-------------------------- */}
                      <div className="sm:col-span-4">
                        <label htmlFor="deadline" className="block text-sm/6 font-medium text-gray-900">
                          Deadline
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            required
                            id="deadline"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Notes-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="notes" className="block text-sm/6 font-medium text-gray-900">
                          Notes
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="notes"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Assignee Details-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="assigneeDetails" className="block text-sm/6 font-medium text-gray-900">
                          Assignee Details
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="assigneeDetails"
                            value={formData.assigneeDetails}
                            onChange={handleChange}
                            disabled={isFormDisabled} 
                            id="assigneeDetails"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      {/* //    --------------------------Assignee Details-------------------------- */}
                      <div className="col-span-full">
                        <label htmlFor="clientDetails" className="block text-sm/6 font-medium text-gray-900">
                          Assignee Details
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="clientDetails"
                            value={formData.clientDetails}
                            onChange={handleChange}
                            disabled={isFormDisabled}  
                            id="clientDetails"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            defaultValue={''}
                          />
                        </div>
                      </div>

                    </div>
                    {/* radio buttons from */}
                    <div className="border-b border-gray-900/10 pb-12">
                    {/* //    --------------------------Contract Status-------------------------- */}
                      <div className="mt-10 space-y-10">
                        <fieldset>
                          <legend className="text-sm/6 font-semibold text-gray-900">Contract Status</legend>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="completed"
                                type="radio"
                                name="contractStatus"
                                value="Completed"
                                checked={formData.contractStatus === "Completed"}
                                onChange={handleChange}
                                disabled={isFormDisabled} 
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="completed" className="block text-sm/6 font-medium text-gray-900">
                                Completed
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="inprogress"
                                type="radio"
                                name="contractStatus"
                                value="inProgress"
                                checked={formData.contractStatus === "inProgress"}
                                onChange={handleChange}
                                disabled={isFormDisabled} 
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="inprogress" className="block text-sm/6 font-medium text-gray-900">
                                In Progress
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    {/* //    --------------------------Payment Status-------------------------- */}
                      <div className="mt-10 space-y-10">
                        <fieldset>
                          <legend className="text-sm/6 font-semibold text-gray-900">Payment Status</legend>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="pending"
                                type="radio"
                                name="paymentStatus"
                                value="Pending"
                                checked={formData.paymentStatus === "Pending"}
                                onChange={handleChange}
                                disabled={isFormDisabled} 
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="pending" className="block text-sm/6 font-medium text-gray-900">
                                Pending
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="paid"
                                type="radio"
                                name="paymentStatus"
                                value="Paid"
                                checked={formData.paymentStatus === "Paid"}
                                onChange={handleChange}
                                disabled={isFormDisabled} 
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="paid" className="block text-sm/6 font-medium text-gray-900">
                                Paid
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    {/* radio buttons to */}
                  </div>
                  <div className="mt-6 flex items-center gap-x-6">
                    <button
                      type="submit" 
                      onClick={handleAddInvoice}
                      className="bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl"
                    >
                      {location.state && location.state.invoice ? 'Update Contract' : 'Add Contract'}
                    </button>
                  </div>
                </form>
                {/* form to */}
              </div>
              <div className={`hidden lg:block lg:min-w-[40vw] lg:max-w-[40vw] lg:max-h-[80vh] ${isFixed ? ' lg:fixed lg:bottom-0 lg:top-10 lg:right-[2%] ' : 'lg:static'}`}>
                {/* Preview Section for large screens */}
                <PreviewSection formData={formData} logoURL={logoURL} previewRef={previewRef} />
              </div>
            </div>
            {/* Popup for PDF download */}
            {showPopup && (
              <PDFPopup
              formData={savedFormData} // Pass the saved data to the popup
              handlePrint={handlePrint}
              setShowPopup={setShowPopup}
              logoURL={logoURL}
              previewRef={previewRef}
              />
            )}
            {/* <!-- Floating Button --> */}
            {/* <div className='fixed bottom-20 right-0 w-full'>
              <div className='w-full 2xl:max-w-screen-2xl 2xl:mx-auto relative'>
              <Link to="/invoicelist">
              <button className="absolute text-xs md:text-sm lg:text-lg xl:text-xl bottom-0 right-0 bg-blue-500 text-white font-bold py-3 px-5 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-300 mr-2">
                + ContractsList
              </button>
            </Link>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default AddInvoice;