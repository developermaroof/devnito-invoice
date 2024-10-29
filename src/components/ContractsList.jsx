import React, { useEffect, useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig'; 
import { query, collection, where, getDocs } from 'firebase/firestore'; 
// import TruncateText from './TruncateText';
// import PDFPopup from './PDFPopup';
import {
  // BanknotesIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid'
// 
import { BsPinAngle } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'


const ContractsList = () => {
  const { invoices, setInvoices } = useInvoice();
  // const { invoices, setInvoices, deleteInvoice } = useInvoice();
  const navigate = useNavigate();
  const [loading] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [showPopup, setShowPopup] = useState(false); 
  // const [selectedInvoice, setSelectedInvoice] = useState(null); 
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // Track favorite invoices
console.log("Invoices data:", invoices)
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

// const handleEdit = (invoice) => {
//   navigate('/addinvoices', { state: { invoice } });
// };

// const handleDelete = async (id) => {
//   setLoading(true);
//   try {
//     await deleteInvoice(id);
//     setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id));
//   } catch (error) {
//     console.error("Error deleting invoice: ", error);
//     alert("Failed to delete the invoice. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleView = (invoice) => {
//   setSelectedInvoice(invoice); // Set selectedInvoice directly
//   setShowPopup(true);
// };


// Add or remove an invoice from favorites
const handleFavorite = (invoice) => {
  const isAlreadyFavorite = favorites.some(fav => fav.id === invoice.id);
  if (isAlreadyFavorite) {
    setFavorites(favorites.filter(fav => fav.id !== invoice.id));
  } else {
    setFavorites([...favorites, invoice]);
  }
};

  return (
    <div className="flex flex-1 flex-col lg:pl-64 ">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* Starts Pinned projects */}
      <div className="min-h-full">
        <div className="flex flex-col lg:pl-64">
          <main className="flex-1">
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-900">Pinned Projects</h2>
              {favorites.length === 0 ? (
                <p className="text-left text-xs md:text-sm lg:text-lg xl:text-xl">No pinned projects added yet.</p>
              ) : (
              <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                {favorites.map((fav) => (
                  <li key={fav.id} className="relative col-span-1 flex rounded-md shadow-sm">
                    <div>
                      <img src={fav.companyLogo} alt="Company Logo" width={100} height={100} className="w-7 lg:w-10 xl:w-12 h-auto object-contain" />
                    </div>
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <a href="/" className="font-medium text-gray-900 hover:text-gray-600">
                          {fav.title}
                        </a>
                        <p className="text-gray-500">Due Date: {fav.deadline}</p>
                      </div>
                      <Menu as="div" className="flex-shrink-0 pr-2">
                        <MenuButton className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <a
                                href="/"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                View
                              </a>
                            </MenuItem>
                          </div>
                          <div className="py-1">
                            <MenuItem>
                              <a
                                href="/"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Removed from pinned
                              </a>
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="/"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Share
                              </a>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>
                  </li>
                ))}
              </ul>
              )}
            </div>
          </main>
        </div>
      </div>
      {/* Ends Pinned projects */}
      {/* Starts List */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      <div className="min-h-full">
        <main className="flex-1">
          <div className="mt-6 px-4 sm:px-6 lg:px-8">
            {invoices.length === 0 && !loading ? (
            <div>
              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                Recent activity
              </h2>
              <p className="text-left text-xs md:text-sm lg:text-lg xl:text-xl">No contracts available.</p>
            </div>
            ) : (
            <main className="flex-1 pb-8">
              <div className="mt-8">
                <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                  Recent activity
                </h2>
                {/* Activity list (smallest breakpoint only) */}
                <div className="shadow sm:hidden">
                  <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                    {invoices.map((invoice) => (
                      <li key={invoice.id}>
                        <div className="block bg-white px-4 py-4 hover:bg-gray-50">
                          <span className="flex items-center space-x-4">
                            <span className="flex flex-1 space-x-2 truncate">
                              <button
                                onClick={() => handleFavorite(invoice)}
                                className={`text-md lg:text-lg xl:text-2xl cursor-pointer ${favorites.some(fav => fav.id === invoice.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                              >
                                <BsPinAngle />
                              </button>
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">Contract with {invoice.name}</span>
                                <span className="font-medium text-gray-900">{invoice.projectBudget}</span>
                                <time dateTime={invoice.datetime}>{invoice.deadline}</time>
                              </span>
                            </span>
                            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <nav
                    aria-label="Pagination"
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                  >
                    <div className="flex flex-1 justify-between">
                      <a
                        href="/"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="/"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
                {/* Activity table (small breakpoint and up) */}
                <div className="hidden sm:block">
                  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-2 flex flex-col">
                      <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Transaction
                              </th>
                              <th
                                scope="col"
                                className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              >
                                Amount
                              </th>
                              <th
                                scope="col"
                                className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                              >
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                          {invoices.map((invoice) => (
                              <tr key={invoice.id} className="bg-white">
                                <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleFavorite(invoice)}
                                      className={`text-md lg:text-lg xl:text-2xl cursor-pointer ${favorites.some(fav => fav.id === invoice.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                                    >
                                      <BsPinAngle />
                                    </button>
                                    <p className="truncate text-gray-500 group-hover:text-gray-900">
                                      Contract with {invoice.name}
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap border-2 border-red-600 px-6 text-right text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">{invoice.projectBudget}</span>
                                </td>
                                <td className="hidden border-2 border-red-600 whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                  <span className="border-2 font-medium capitalize">
                                    {invoice.contractStatus}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  <time dateTime={invoice.datetime}>{invoice.deadline}</time>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* Pagination */}
                        <nav
                          aria-label="Pagination"
                          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                        >
                          <div className="hidden sm:block">
                            <p className="text-sm text-gray-700">
                              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                              <span className="font-medium">20</span> results
                            </p>
                          </div>
                          <div className="flex flex-1 justify-between gap-x-3 sm:justify-end">
                            <a
                              href="/"
                              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                            >
                              Previous
                            </a>
                            <a
                              href="/"
                              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                            >
                              Next
                            </a>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            </main>
            )}
          </div>
        </main>
      </div>
      {/* Ends List */}
    </div>
  )
}

export default ContractsList