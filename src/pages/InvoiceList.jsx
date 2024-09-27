import React, { useEffect, useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { useNavigate } from 'react-router-dom';
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
    // Fetch invoices if needed
  }, []);

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
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Invoice List</h1>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {invoices.length === 0 && !loading ? (
          <p className="text-center">No invoices available.</p>
        ) : (
          <div className="overflow-x-auto mx-20 max-w-6xl mx-auto shadow-lg rounded-lg">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Name</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Contract Status</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Starting Date</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Deadline</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Payment Status</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Title</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Client Details</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Assignee Details</th>
                  <th className="border border-gray-300 p-2 min-w-[150px]">Notes</th>
                  <th className="border border-gray-300 p-2 min-w-[100px]">View</th>
                  <th className="border border-gray-300 p-2 min-w-[100px]">Edit</th>
                  <th className="border border-gray-300 p-2 min-w-[100px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="border border-gray-300 p-2 min-w-[150px]">{invoice.name}</td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">{invoice.contractStatus}</td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">{invoice.startingDate}</td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">{invoice.deadline}</td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">{invoice.paymentStatus}</td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">{invoice.title}</td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">
                      <TruncateText text={invoice.clientDetails} maxLength={30} />
                    </td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">
                      <TruncateText text={invoice.assigneeDetails} maxLength={30} />
                    </td>
                    <td className="border border-gray-300 p-2 min-w-[150px]">
                      <TruncateText text={invoice.notes} maxLength={30} />
                    </td>
                    <td className="border border-gray-300 p-2 min-w-[100px] text-center">
                      <button
                        onClick={() => handleView(invoice)} // View button
                        className="text-sm text-green-500 cursor-pointer hover:text-green-700"
                      >
                        View
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2 min-w-[100px] text-center">
                      <button
                        onClick={() => handleEdit(invoice)} // Edit button
                        className="text-sm text-blue-500 cursor-pointer hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2 min-w-[100px] text-center">
                      <button
                        onClick={() => handleDelete(invoice.id)} // Delete button
                        className="text-sm text-red-500 cursor-pointer hover:text-red-700"
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
