// import React, { useEffect, useState } from 'react';
// import { useInvoice } from '../context/InvoiceContext';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from 'react-router-dom';
// import { auth, db } from '../firebase/firebaseConfig'; 
// import { query, collection, where, getDocs } from 'firebase/firestore'; 
// import TruncateText from './TruncateText';
// import PDFPopup from './PDFPopup';
import {
  BanknotesIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid'
// 
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'


const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  // More projects...
]
const pinnedProjects = projects.filter((project) => project.pinned)
// 
const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '/',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const ContractsList = () => {
  // const { invoices, setInvoices, deleteInvoice } = useInvoice();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [showPopup, setShowPopup] = useState(false); 
  // const [selectedInvoice, setSelectedInvoice] = useState(null); 
  // const [error, setError] = useState(null);
  // const [favorites, setFavorites] = useState([]); // Track favorite invoices

//   useEffect(() => {
//     const fetchInvoices = async () => {
//         const user = auth.currentUser;
//         if (!user) {
//             navigate('/login'); // Redirect to login if not authenticated
//             return; // Exit the function early
//         }

//         try {
//             const q = query(collection(db, 'invoices'), where('userId', '==', user.uid));
//             const querySnapshot = await getDocs(q);
//             const fetchedInvoices = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setInvoices(fetchedInvoices);
//         } catch (error) {
//             console.error('Error fetching invoices:', error);
//             setError('Failed to fetch invoices. Please try again later.'); // Set error state
//         }
//     };
//     fetchInvoices();
// }, [setInvoices, navigate]);

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
// const handleFavorite = (invoice) => {
//   const isAlreadyFavorite = favorites.some(fav => fav.id === invoice.id);
//   if (isAlreadyFavorite) {
//     setFavorites(favorites.filter(fav => fav.id !== invoice.id));
//   } else {
//     setFavorites([...favorites, invoice]);
//   }
// };

  return (
    <div className="flex flex-1 flex-col lg:pl-64 ">
      <div className="min-h-full">
        <div className="flex flex-col lg:pl-64">
          <main className="flex-1">
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-900">Pinned Projects</h2>
              <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                {pinnedProjects.map((project) => (
                  <li key={project.id} className="relative col-span-1 flex rounded-md shadow-sm">
                    <div
                      className={classNames(
                        project.bgColorClass,
                        'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
                      )}
                    >
                      {project.initials}
                    </div>
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <a href="/" className="font-medium text-gray-900 hover:text-gray-600">
                          {project.title}
                        </a>
                        <p className="text-gray-500">{project.totalMembers} Members</p>
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
            </div>
          </main>
        </div>
      </div>
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
            Recent activity
          </h2>
          {/* Activity list (smallest breakpoint only) */}
          <div className="shadow sm:hidden">
            <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <a href={transaction.href} className="block bg-white px-4 py-4 hover:bg-gray-50">
                    <span className="flex items-center space-x-4">
                      <span className="flex flex-1 space-x-2 truncate">
                        <BanknotesIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <span className="flex flex-col truncate text-sm text-gray-500">
                          <span className="truncate">{transaction.name}</span>
                          <span>
                            <span className="font-medium text-gray-900">{transaction.amount}</span>{' '}
                            {transaction.currency}
                          </span>
                          <time dateTime={transaction.datetime}>{transaction.date}</time>
                        </span>
                      </span>
                      <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    </span>
                  </a>
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
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white">
                        <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          <div className="flex">
                            <a href={transaction.href} className="group inline-flex space-x-2 truncate text-sm">
                              <BanknotesIcon
                                aria-hidden="true"
                                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              />
                              <p className="truncate text-gray-500 group-hover:text-gray-900">
                                {transaction.name}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{transaction.amount}</span>
                          {transaction.currency}
                        </td>
                        <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                          <span
                            className={classNames(
                              statusStyles[transaction.status],
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                            )}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <time dateTime={transaction.datetime}>{transaction.date}</time>
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
  </div>
  )
}

export default ContractsList