import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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
                {/* form */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4 lg:space-y-8 lg:px-10 lg:mb-32">
                  {/* Title input */}
                  <div>
                    <label className="requiredStar block mb-1 lg:text-xl xl:text-2xl">Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      placeholder='Type title..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      required
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                  />
                  </div>
                  {/* assignee details input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Assignee Details:</label>
                    <textarea
                      name="assigneeDetails"
                      value={formData.assigneeDetails}
                      placeholder='Type Something..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Banner Address input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Banner Address:</label>
                    <input
                      type="text"
                      name="bannerAddress"
                      value={formData.bannerAddress}
                      placeholder='Type address..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Banner Email input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Banner Email:</label>
                    <input
                      type="email"
                      name="bannerEmail"
                      value={formData.bannerEmail}
                      placeholder='Put email..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Banner Website input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Banner Website:</label>
                    <input
                      type="url"
                      name="bannerWebsite"
                      value={formData.bannerWebsite}
                      placeholder='Paste website URL..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* CEO Email input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">CEO Email:</label>
                    <input
                      type="email"
                      name="ceoEmail"
                      value={formData.ceoEmail}
                      placeholder='Put email..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* CEO Name input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">CEO Name:</label>
                    <input
                      type="text"
                      name="ceoName"
                      value={formData.ceoName}
                      placeholder='Type name..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Client Details input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Client Details:</label>
                    <textarea
                      name="clientDetails"
                      value={formData.clientDetails}
                      placeholder='Type Something..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Company Logo input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Company Logo:</label>
                    <input
                      type="file"
                      name="companyLogo"
                      accept="image/*"
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                        {logoURL && ( // Display the logo if available
                        <img src={logoURL} alt="Company Logo" className="mt-2 w-10 h-10 object-contain" />
                      )}
                  </div>
                  {/* Company Name input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Company Name:</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      placeholder='Type company name..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Contract Heading input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Contract Heading:</label>
                    <input
                      type="text"
                      name="contractHeading"
                      value={formData.contractHeading}
                      placeholder='Type contract heading..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Contract details Status */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Contract Status:</label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="contractStatus"
                        value="Completed"
                        checked={formData.contractStatus === "Completed"}
                        onChange={handleChange}
                        disabled={isFormDisabled} // Disable based on sidebar
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
                        disabled={isFormDisabled} // Disable based on sidebar
                        className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl"
                      />
                      <label className="ml-2 lg:text-lg xl:text-xl">In Progress</label>
                    </div>
                  </div>
                  {/* Deadline input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Deadline:</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      placeholder='Put the deadline..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Duration Hard input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Duration (Hard Deadline):</label>
                    <input
                      type="text"
                      name="durationHard"
                      value={formData.durationHard}
                      placeholder='Type hard deadline..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Duration Soft input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Duration (Soft Deadline):</label>
                    <input
                      type="text"
                      name="durationSoft"
                      value={formData.durationSoft}
                      placeholder='Type soft deadline..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Ending Description input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Ending Description:</label>
                    <textarea
                      name="endingDescription"
                      value={formData.endingDescription}
                      placeholder='Type ending message..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Name input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder='Type name..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Notes input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Notes:</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      placeholder='Type any notes..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Paragraph 1 input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Paragraph 1:</label>
                    <textarea
                      name="paragraph1"
                      value={formData.paragraph1}
                      placeholder='Type paragraph 1..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Paragraph 2 input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Paragraph 2:</label>
                    <textarea
                      name="paragraph2"
                      value={formData.paragraph2}
                      placeholder='Type paragraph 2..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Paragraph 3 input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Paragraph 3:</label>
                    <textarea
                      name="paragraph3"
                      value={formData.paragraph3}
                      placeholder='Type paragraph 3..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    ></textarea>
                  </div>
                  {/* Payment Status input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Payment Status:</label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Pending"
                        checked={formData.paymentStatus === "Pending"}
                        onChange={handleChange}
                        disabled={isFormDisabled} // Disable based on sidebar
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
                        disabled={isFormDisabled} // Disable based on sidebar
                        className="border border-gray-300 p-2 rounded lg:text-lg xl:text-xl"
                      />
                      <label className="ml-2 lg:text-lg xl:text-xl">Paid</label>
                    </div>
                  </div>
                  {/* Project Budget input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Project Budget:</label>
                    <input
                      type="text"
                      name="projectBudget"
                      value={formData.projectBudget}
                      placeholder='Put project budget..'
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                  {/* Starting from input */}
                  <div>
                    <label className="block mb-1 lg:text-xl xl:text-2xl">Starting from:</label>
                    <input
                      type="date"
                      name="startingDate"
                      value={formData.startingDate}
                      onChange={handleChange}
                      disabled={isFormDisabled} // Disable based on sidebar
                      className="border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl"
                    />
                  </div>
                   {/* Button */}
                  <button
                    type="submit" 
                    onClick={handleAddInvoice}
                    className="bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl"
                  >
                    {location.state && location.state.invoice ? 'Update Contract' : 'Add Contract'}
                  </button>
                </form>
               {/* form */}
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