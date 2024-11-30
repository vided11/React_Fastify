import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
  const [item, setItem] = useState({
    name: '',
    price: '',
    status: '',
    link: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const checkNameExists = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3001/items?name=${name}`);
      return response.data.length > 0;
    } catch (err) {
      console.error('Error checking name:', err);
      return false;
    }
  };
  const validateItem = () => {
    if (!item.name || item.name.trim() === '') {
      setError('Name is required and must be a non-empty string');
      return false;
    }

    const price = parseFloat(item.price);
    if (isNaN(price) || price < 0 || price > 3000) {
      setError('Price must be a number between 0 and 3000');
      return false;
    }

    if (!item.status || item.status.trim() === '') {
      setError('Status is required and must be a non-empty string');
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateItem()) {
      return;
    }

     try {
      const nameExists = await checkNameExists(item.name);
      if (nameExists) {
        setError('An item with this name already exists');
        return;
      }

      const response = await axios.post('http://localhost:3001/items', {
        ...item,
        price: parseFloat(item.price)
      });
      setSuccess(true);
      setItem({ name: '', price: '', status: '', link: '' });
      console.log('Created item:', response.data);
    } catch (err) {
      setError('Error creating item: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Item created successfully!</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            type="text"
            name="status"
            value={item.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
            Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="url"
            name="link"
            value={item.link}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;