import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchItem = () => {
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setItem(null);

    try {
      const response = await axios.get(`http://localhost:3001/items/${itemId}`);
      if (response.data) {
        setItem(response.data);
      } else {
        setError('Item not found');
      }
    } catch (err) {
      setError('Error finding item');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${item.id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/items/${item.id}`);
      setItem(null);
      setItemId('');
      alert('Item deleted successfully');
    } catch (err) {
      setError('Error deleting item');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Find and Edit Item</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <label htmlFor="itemId" className="block mb-1">Item ID</label>
          <input
            type="text"
            id="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Find Item
        </button>
      </form>

      {item && (
        <div className="border rounded p-4 mb-4">
          <h3 className="text-xl font-bold mb-2">Found Item</h3>
          <div className="space-y-2">
            <p><strong>ID:</strong> <span className="ml-2">{item.id}</span></p>
            <p><strong>Name:</strong> <span className="ml-2">{item.name}</span></p>
            <p><strong>Price:</strong> <span className="ml-2">{item.price}</span></p>
            <p><strong>Status:</strong> <span className="ml-2">{item.status}</span></p>
            <p>
              <strong>Link:</strong>
              <a href={item.link} className="ml-2 text-blue-500 break-all hover:underline" target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            </p>
          </div>
          <div className="mt-4 space-x-2">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchItem;