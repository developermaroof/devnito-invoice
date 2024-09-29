import React, { useEffect, useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig'; // Ensure you have access to Firebase Auth
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TruncateText from '../components/TruncateText';
import PDFPopup from '../components/PDFPopup'; // Import PDFPopup

const InvoiceList = () => {
  const { invoices, setInvoices, deleteInvoice } = useInvoice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State for storing selected invoice data

  useEffect(() => {
    const fetchInvoices = async () => {
      const user = auth.currentUser; // Get the current user
      if (user) {
        try {
          const querySnapshot = await db.collection('invoices')
            .where('userId', '==', user.uid) // Fetch only invoices for the logged-in user
            .get();
            
          const userInvoices = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setInvoices(userInvoices); // Set the invoices in state
        } catch (error) {
          console.error("Error fetching invoices: ", error);
          // Handle error
        }
      }
    };

    fetchInvoices();
  }, [setInvoices]);

  const handleEdit = (invoice) => {
    navigate('/addinvoices', { state: { invoice } });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteInvoice(id);
      setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error("Error deleting invoice: ", error);
      alert("Failed to delete the invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice); // Set the selected invoice data
    setShowPopup(true); // Show the popup
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-4 pt-10 2xl:max-w-screen-2xl 2xl:mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold my-10 lg:mb-20 text-center">Invoice List</h1>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {invoices.length === 0 && !loading ? (
          <p className="text-center">No invoices available.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg p-4 m-4" style={{ boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.3)' }}>

            <table className="min-w-full">
              <thead className='text-center'>
                <tr>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Name</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Contract Status</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Starting Date</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Deadline</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Payment Status</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Title</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Client Details</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Assignee Details</th>
                  <th className="p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Notes</th>
                  <th className="p-2 min-w-[100px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">View</th>
                  <th className="p-2 min-w-[100px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Edit</th>
                  <th className="p-2 min-w-[100px] lg:min-w-[200px] xl:min-w-[250px] md:text-lg lg:text-xl xl:text-2xl">Delete</th>
                </tr>
              </thead>
              <tbody className='bg-tbodycolor text-center'>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="border border-4 border-l-0 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] text-sm md:text-[1rem] lg:text-lg xl:text-xl">{invoice.name}</td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl">{invoice.contractStatus}</td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl">{invoice.startingDate}</td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl">{invoice.deadline}</td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl">{invoice.paymentStatus}</td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl">{invoice.title}</td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl">
                      <TruncateText text={invoice.clientDetails} maxLength={30} />
                    </td>
                    <td className="border-y border-y-4 border-gray-100 text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl p-2 min-w-[150px] lg:min-w-[200px]">
                      <TruncateText text={invoice.assigneeDetails} maxLength={30} />
                    </td>
                    <td className="border-y border-y-4 border-gray-100 text-gray-600 text-sm md:text-[1rem] lg:text-lg xl:text-xl p-2 min-w-[150px] lg:min-w-[200px]">
                      <TruncateText text={invoice.notes} maxLength={30} />
                    </td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[100px] text-center">
                      <button
                        onClick={() => handleView(invoice)} // View button
                        className="text-sm md:text-[1rem] lg:text-lg xl:text-xl text-green-500 cursor-pointer hover:text-green-700"
                      >
                        View
                      </button>
                    </td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[100px] text-center">
                      <button
                        onClick={() => handleEdit(invoice)} // Edit button
                        className="text-sm md:text-[1rem] lg:text-lg xl:text-xl text-blue-500 cursor-pointer hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border-y border-y-4 border-gray-100 p-2 min-w-[100px] text-center">
                      <button
                        onClick={() => handleDelete(invoice.id)} // Delete button
                        className="text-sm md:text-[1rem] lg:text-lg xl:text-xl text-red-500 cursor-pointer hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showPopup && (
        <PDFPopup
          formData={selectedInvoice} // Pass the selected invoice data
          setShowPopup={setShowPopup} // Pass the function to close the popup
        />
      )}
      <Footer />
    </div>
  );
};

export default InvoiceList;
