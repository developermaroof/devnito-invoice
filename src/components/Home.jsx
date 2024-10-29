import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import {
  CheckCircleIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';



const Home = () => {
  const { userData } = useAuthContext();
    console.log("This is userData: ",userData);

    const handleAddContractClick = () => {
      localStorage.setItem('currentNav', 'Contracts'); // Set 'Contracts' as active in localStorage
    };

    return (
    <div className="flex flex-1 flex-col lg:pl-64 ">
    <main className="flex-1 pb-8">
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              {/* Profile */}
              <div className="flex items-center">
                <img
                  alt="Profile"
                  src={userData.photoURL || ""}
                  className="hidden h-16 w-16 rounded-full sm:block"
                />
                <div>
                  <div className="flex items-center">
                    <img
                      alt=""
                      src={userData.photoURL || ""}
                      className="h-16 w-16 rounded-full sm:hidden"
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Good morning, {userData.displayName}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Company</dt>
                    <dd className="flex items-center text-sm font-medium text-gray-500 sm:mr-6">
                      <InboxIcon
                        aria-hidden="true"
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      />
                      {userData.email}
                    </dd>
                    <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                      />
                      Verified account
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
              <Link to="/addcontract">
              <button
                type="button"
                onClick={handleAddContractClick}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Add Contract
              </button>
              </Link>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Send money
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default Home