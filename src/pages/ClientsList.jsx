import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid';

import React, { useEffect, useState } from 'react';
import { useClient } from '../context/ClientContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { query, collection, where, getDocs } from 'firebase/firestore';

const ClientsList = () => {
  const { clients, setClients } = useClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("clients data:", clients);

  useEffect(() => {
    const fetchClients = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const q = query(collection(db, 'clients'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedClients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setClients(fetchedClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Failed to fetch clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [setClients, navigate]);

  return (
    <div className="min-h-full lg:pl-64">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <main className="pb-16 pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {clients && clients.length === 0 && !loading ? (
            <p className="text-left text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              No clients available.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
              {clients?.map((client) => (
                <li key={client.id}>
                  <Link to={`/clientdetails/${client.id}`} className="group block">
                    <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src={client.userProfile}
                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-purple-600">
                              {client.name}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <EnvelopeIcon
                                aria-hidden="true"
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              />
                              <span className="truncate">{client.email}</span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Applied on ( {client.currentDate} )
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  aria-hidden="true"
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                />
                                Completed phone screening
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          {/* Pagination */}
          <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
          >
            <div className="-mt-px flex w-0 flex-1">
              <a
                href="/"
                className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
                Previous
              </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
              {/* Pagination buttons */}
              <a
                href="/"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                1
              </a>
              <a
                href="/"
                aria-current="page"
                className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
              >
                2
              </a>
              {/* Other pages */}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <a
                href="/"
                className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                Next
                <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
              </a>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default ClientsList;
