import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";

const AddClient = () => {
  const initialFormState = {
    name: '',
    email: '',
    number: '',
    country: '',
    source: '',
    website: '',
    projectsCompleted: '',
    earnings: '',
    linkedin: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [additionalFields, setAdditionalFields] = useState([]);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to add a client.');
      return;
    }

    try {
      const clientData = {
        ...formData,
        userId: user.uid,
        additionalFields, // Include dynamic fields
      };

      await addDoc(collection(db, 'clients'), clientData);
      alert('Client added successfully!');
      setFormData(initialFormState); // Reset form after submission
      setAdditionalFields([]); // Clear additional fields
      navigate('/clientlist'); // Navigate to your client list page
    } catch (error) {
      console.error('Error adding client: ', error);
      alert(`Error adding client: ${error.message}`);
    }
  };

  return (
    <>
    <Navbar />
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
    <Footer/>
    </>
  );
};

export default AddClient;
