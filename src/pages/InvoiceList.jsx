import React, { useEffect, useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig'; 
import { query, collection, where, getDocs } from 'firebase/firestore'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TruncateText from '../components/TruncateText';
import PDFPopup from '../components/PDFPopup'; 

const InvoiceList = () => {
  const { invoices, setInvoices, deleteInvoice } = useInvoice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedInvoice, setSelectedInvoice] = useState(null); 
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // Track favorite invoices

  useEffect(() => {
      const fetchInvoices = async () => {
          const user = auth.currentUser;
          if (!user) {
              navigate('/login'); // Redirect to login if not authenticated
              return; // Exit the function early
          }
  
          try {
              const q = query(collection(db, 'invoices'), where('userId', '==', user.uid));
              const querySnapshot = await getDocs(q);
              const fetchedInvoices = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
              }));
              setInvoices(fetchedInvoices);
          } catch (error) {
              console.error('Error fetching invoices:', error);
              setError('Failed to fetch invoices. Please try again later.'); // Set error state
          }
      };
      fetchInvoices();
  }, [setInvoices, navigate]);

  // Add or remove an invoice from favorites
  const handleFavorite = (invoice) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === invoice.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== invoice.id));
    } else {
      setFavorites([...favorites, invoice]);
    }
  };

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
    setSelectedInvoice(invoice); // Set selectedInvoice directly
    setShowPopup(true);
};

  

  return (
    <div className="flex flex-col min-h-screen">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <Navbar />
      <div className="flex-grow p-4 pt-10 2xl:max-w-screen-2xl 2xl:mx-auto">

        {/* Favorites Section */}
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-10 lg:mt-14 mb-5 lg:mb-10 text-left">Favorites :</h1>
        {favorites.length === 0 ? (
          <p className="text-left text-xs md:text-sm lg:text-lg xl:text-xl">No favorites added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-4 w-full">
            {favorites.map((fav) => (
              <div key={fav.id} className="bg-gray-100 flex items-center p-4 rounded-lg gap-2">
                <div>
                  <img src={fav.companyLogo} alt="Company Logo" width={100} height={100} className="w-7 lg:w-10 xl:w-12 h-auto object-contain" />
                </div>
                <div className="">
                  <h2 className="text-xs lg:text-lg xl:text-xl font-semibold">{fav.title}</h2>
                  <p className="text-[0.7rem] lg:text-sm xl:text-lg text-gray-500">Due Date: {fav.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Invoices List Section */}
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-10 lg:mt-14 mb-5 lg:mb-10 text-left">Invoices List :</h1>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {invoices.length === 0 && !loading ? (
          <p className="text-left text-xs md:text-sm lg:text-lg xl:text-xl">No invoices available.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg py-4">
            <table className="min-w-full">
              <thead className='text-center'>
                <tr>
                  {/* Add Favorite Column */}
                  <th className="p-2 min-w-[50px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Favorite</th>
                  <th className="p-2 min-w-[100px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Name</th>
                  <th className="p-2 min-w-[120px] md:min-w-[140px] lg:min-w-[150px] xl:min-w-[170px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Contract Status</th>
                  <th className="p-2 min-w-[100px] md:min-w-[120px] lg:min-w-[130px] xl:min-w-[150px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Starting Date</th>
                  <th className="p-2 min-w-[100px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Deadline</th>
                  <th className="p-2 min-w-[120px] md:min-w-[140px] lg:min-w-[150px] xl:min-w-[170px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Payment Status</th>
                  <th className="p-2 min-w-[100px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Title</th>
                  <th className="p-2 min-w-[100px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Client Details</th>
                  <th className="p-2 min-w-[100px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Assignee Details</th>
                  <th className="p-2 min-w-[100px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Notes</th>
                  <th className="p-2 min-w-[50px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">View</th>
                  <th className="p-2 min-w-[50px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Edit</th>
                  <th className="p-2 min-w-[50px] text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl">Delete</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    {/* Favorite Button */}
                    <td className="border p-2">
                      <button
                        onClick={() => handleFavorite(invoice)}
                        className={`text-md lg:text-lg xl:text-2xl cursor-pointer ${favorites.some(fav => fav.id === invoice.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                      >
                        ★
                      </button>
                    </td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[120px] md:min-w-[130px] lg:min-w-[140px] xl:min-w-[160px]">{invoice.name}</td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px]">{invoice.contractStatus}</td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px]">{invoice.startingDate}</td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px] xl:min-w-[120px]">{invoice.deadline}</td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px]">{invoice.paymentStatus}</td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[140px] md:min-w-[150px] lg:min-w-[170px] xl:min-w-[200px]">{invoice.title}</td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[150px] md:min-w-[170px] lg:min-w-[180px] xl:min-w-[200px]">
                      <TruncateText text={invoice.clientDetails} maxLength={30} />
                    </td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[150px] md:min-w-[170px] lg:min-w-[180px] xl:min-w-[200px]">
                      <TruncateText text={invoice.assigneeDetails} maxLength={30} />
                    </td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[150px] md:min-w-[170px] lg:min-w-[180px] xl:min-w-[200px]">
                      <TruncateText text={invoice.notes} maxLength={30} />
                    </td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px]">
                      <button
                        onClick={() => handleView(invoice)}
                        className="text-green-500 hover:text-green-700"
                      >
                        View
                      </button>
                    </td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px]">
                      <button
                        onClick={() => handleEdit(invoice)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border p-2 text-xs md:text-sm lg:text-[1rem] xl:text-[1.2rem] min-w-[100px]">
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="text-red-500 hover:text-red-700"
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

      {/* Floating Button */}
      <Link to="/addinvoices">
        <button className="fixed text-xs md:text-sm lg:text-lg xl:text-xl bottom-20 right-5 bg-blue-500 text-white font-bold py-3 px-5 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-300">
          + AddInvoices
        </button>
      </Link>

      {showPopup && (
    <PDFPopup 
        formData={selectedInvoice} 
        logoURL={selectedInvoice?.companyLogo} // Pass the logo URL here
        setShowPopup={setShowPopup} 
    />
)}


      <Footer />
    </div>
  );
};

export default InvoiceList;
