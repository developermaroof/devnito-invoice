import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { UserCircleIcon } from '@heroicons/react/24/solid'

const AddClient = () => {
  const initialFormState = {
    name: '',
    email: '',
    number: '',
    country: '',
    userProfile: null,
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
    <div className='mb-10 w-[100%] border-2 border-red-300'>
      <h1 className='font-semibold text-center'>Add Client</h1>
      <form onSubmit={handleSubmit} className='border-yellow-500 border-2'>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Name:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Email:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Number:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="text" name="number" value={formData.number} onChange={handleChange} />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Country:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="text" name="country" value={formData.country} onChange={handleChange} />
        </div>
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
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Source:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="text" name="source" value={formData.source} onChange={handleChange} />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Website:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="url" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Projects Completed:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="text" name="projectsCompleted" value={formData.projectsCompleted} onChange={handleChange} />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Earnings:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="text" name="earnings" value={formData.earnings} onChange={handleChange} />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>Current Date:</label>
          <input
            className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl'
            type='date'
            name="currentDate"
            value={formData.currentDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='block mb-1 lg:text-xl xl:text-2xl'>LinkedIn:</label>
          <input className='border border-gray-300 p-2 rounded w-full lg:text-lg xl:text-xl' type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>

        {/* Dynamic Fields */}
        {additionalFields.map((field, index) => (
          <div key={index}>
            <label className='block mb-1 lg:text-xl xl:text-2xl'>Additional Field {index + 1}:</label>
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

        <button type="button" onClick={handleAddField}>+ Add Additional Field</button>
        <button type="submit" className='bg-primary text-white text-xs lg:text-lg xl:text-xl px-8 lg:px-10 py-2 rounded-3xl'>Add Client</button>
      </form>
    </div>
  );
};

export default AddClient;
