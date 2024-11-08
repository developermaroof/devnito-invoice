import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { UserCircleIcon } from '@heroicons/react/24/solid'

const AddClient = () => {

  const initialFormState = {
    name: '',
    title: '',
    email: '',
    number: '',
    country: '',
    userProfile: null,
    about: '',
    source: '',
    website: '',
    projectsCompleted: '',
    earnings: '',
    currentDate: '',  // Store raw date input here
    linkedin: '',
  };

  const [logoURL, setLogoURL] = useState(null); // New state for logo URL
  const [formData, setFormData] = useState(initialFormState);
  const [additionalFields, setAdditionalFields] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'userProfile' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, [name]: file }); // Set the file object
      // Create a preview URL for the file
      const fileURL = URL.createObjectURL(file);
      setLogoURL(fileURL); // Set the logo URL for preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = () => {

    setAdditionalFields([...additionalFields, { label: '', value: '' }]);
  
  };

  const handleFieldChange = (index, e) => {
    
    const { name, value } = e.target;
    const newFields = [...additionalFields];
    newFields[index][name] = value;
    setAdditionalFields(newFields);
  
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      
      const user = auth.currentUser;

      if (!user) {
        alert('You must be logged in to add a client.');
        return;
      }

      // Format the date before submission
      const formattedDate = formData.currentDate
        ? new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(formData.currentDate))
        : '';

      let logoUrl = '';

      if (formData.userProfile) {
        // Upload new logo if a file is selected
        const storageRef = ref(storage, `profiles/${formData.userProfile.name}`);
        await uploadBytes(storageRef, formData.userProfile);
        logoUrl = await getDownloadURL(storageRef); // Get the URL for the uploaded logo
      }

      const clientData = {
        ...formData,
        userProfile: logoUrl, // Store the uploaded logo URL
        currentDate: formattedDate, 
        userId: user.uid,
        additionalFields,
      };
  
      await addDoc(collection(db, 'clients'), clientData);
      alert('Client added successfully!');
      setFormData(initialFormState);
      setLogoURL(null); // Reset the logo preview
      setAdditionalFields([]);
      navigate('/clientslist');
    } catch (error) {
      console.error('Error adding client: ', error);
      alert(`Error adding client: ${error.message}`);
    }
  };


  return (
    <div className="flex flex-1 flex-col lg:pl-64 ">
      <main className="flex-1 pb-8">
        <div className="p-6 lg:py-20 2xl:max-w-screen-2xl 2xl:mx-auto relative">
          <div className='lg:flex lg:w-[100%]'>
            <div className='lg:w-[50%] mb-10 lg:mb-0'>
              <h1 className="font-semibold text-center lg:text-2xl xl:text-3xl">
                Add Client
              </h1>
              <form onSubmit={handleSubmit} className=" lg:px-4">
                <div className="space-y-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    
                    {/* //    --------------------------Name-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className=" block text-sm/6 font-medium text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          id="name"
                          autoComplete="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    
                    {/* //    --------------------------Title-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="title" className=" block text-sm/6 font-medium text-gray-900">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          id="title"
                          autoComplete="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    
                    {/* //    --------------------------Email address-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                          Email Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          id="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Number-------------------------- */}

                    <div className="sm:col-span-4">
                      <label htmlFor="number" className="block text-sm/6 font-medium text-gray-900">
                        Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          id="number"
                          autoComplete="number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Country-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                        Country
                      </label>
                      <div className="mt-2">
                        <input
                          type="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          id="country"
                          autoComplete="country"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    
                    {/* //    --------------------------Company Logo-------------------------- */}

                    <div className="col-span-full">
                      <label htmlFor="userProfile" className="block text-sm font-medium text-gray-900">
                        User Profile
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        {!logoURL ? (
                          <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                        ) : (
                          <img src={logoURL} alt="Selected Logo" className="h-12 w-12 object-contain rounded-full" />
                        )}
                        <input
                          type="file"
                          name="userProfile"
                          accept="image/*"
                          onChange={handleChange}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        />
                      </div>
                    </div>
                    
                    {/* //    --------------------------About-------------------------- */}

                    <div className="col-span-full">
                      <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          name="about"
                          value={formData.about}
                          onChange={handleChange}
                          id="about"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          defaultValue={''}
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Source-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="source" className="block text-sm/6 font-medium text-gray-900">
                        Source
                      </label>
                      <div className="mt-2">
                        <input
                          type="url"
                          name="source"
                          value={formData.source}
                          onChange={handleChange}
                          id="source"
                          autoComplete="source"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Website-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="website" className="block text-sm/6 font-medium text-gray-900">
                        Website
                      </label>
                      <div className="mt-2">
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          id="website"
                          autoComplete="website"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Projects Completed-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="projectsCompleted" className="block text-sm/6 font-medium text-gray-900">
                      Projects Completed
                      </label>
                      <div className="mt-2">
                        <input
                          type="projectsCompleted"
                          name="projectsCompleted"
                          value={formData.projectsCompleted}
                          onChange={handleChange}
                          id="projectsCompleted"
                          autoComplete="projectsCompleted"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Earnings-------------------------- */}

                    <div className="sm:col-span-4">
                      <label htmlFor="earnings" className="block text-sm/6 font-medium text-gray-900">
                      Earnings
                      </label>
                      <div className="mt-2">
                        <input
                          type="earnings"
                          name="earnings"
                          value={formData.earnings}
                          onChange={handleChange}
                          id="earnings"
                          autoComplete="earnings"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Current Date-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="currentDate" className="block text-sm/6 font-medium text-gray-900">
                        Current Date
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="currentDate"
                          value={formData.currentDate}
                          onChange={handleChange}
                          id="currentDate"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* //    --------------------------Linkedin-------------------------- */}
                    
                    <div className="sm:col-span-4">
                      <label htmlFor="linkedin" className="block text-sm/6 font-medium text-gray-900">
                      Linkedin
                      </label>
                      <div className="mt-2">
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          id="linkedin"
                          autoComplete="linkedin"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* Dynamic Fields */}

                    <div className="sm:col-span-4">
                      {additionalFields.map((field, index) => (
                        <div key={index}>
                          <label className='block my-2 lg:text-xl xl:text-2xl'>Additional Field {index + 1}:</label>
                          <input
                            type="text"
                            name="label"
                            placeholder="Field label"
                            value={field.label}
                            onChange={(e) => handleFieldChange(index, e)}
                          />
                          <input
                            type="text"
                            name="value"
                            placeholder="Field value"
                            value={field.value}
                            onChange={(e) => handleFieldChange(index, e)}
                          />
                        </div>
                      ))}
                      <button type="button" onClick={handleAddField} className='mt-4'>+ Add Additional Field</button>
                    </div>

                  </div>
                </div>
                <div className="mt-6 flex items-center gap-x-6">
                  <button type="submit" className="bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl">Add Client</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddClient;
