import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ClientDetails = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
          try {
            const docRef = doc(db, 'clients', clientId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setClient(docSnap.data());
            } else {
              setError('Client not found.');
            }
          } catch (error) {
            console.error('Error fetching client details:', error);
            setError('Failed to load client details.');
          } finally {
            setLoading(false);
          }
        };
        fetchClientDetails();
      }, [clientId]);

      if (loading) return <p>Loading...</p>;
      if (error) return <p className="text-red-500">{error}</p>;

    return (
      <>
        <div className="min-h-full lg:pl-64">
          <main className="py-10">
            {/* Page header */}
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="shrink-0">
                  <div className="relative">
                    <img
                      alt=""
                      src={client.userProfile}
                      className="h-16 w-16 rounded-full"
                    />
                    <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                  <p className="text-sm font-medium text-gray-500">
                    Applied
                     on <time dateTime="2020-08-25">{client.currentDate ? `${client.currentDate}` : 'N/A'}</time>
                  </p>
                </div>
              </div>
            </div>
  
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                {/* Description list*/}
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 id="applicant-information-title" className="text-lg/6 font-medium text-gray-900">
                        Client Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Application for</dt>
                          <dd className="mt-1 text-sm text-gray-900">{client.title ? `${client.title}` : 'N/A'}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email address</dt>
                          <dd className="mt-1 text-sm text-gray-900">{client.email ? `${client.email}` : 'N/A'}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                          <dd className="mt-1 text-sm text-gray-900">{client.earnings ? `${client.earnings}` : 'N/A'}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mt-1 text-sm text-gray-900">{client.number ? `${client.number}` : 'N/A'}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">About</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {client.about ? `${client.about}` : 'N/A'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  }

export default ClientDetails;