import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const EditItem = () => {
    const [item, setItem] = useState({
        name: '',
        price: '',
        status: '',
        link: ''
    });
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/items/${id}`);
                setItem(response.data);
            } catch (err) {
                setError('Error fetching item');
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value});
    };

    const validateItem = () => {
        if (!item.name || item.name.trim() === '') {
            setError('Name is required');
            return false;
        }
        if (!item.price || isNaN(item.price) || Number(item.price) < 0) {
            setError('Price must be a positive number');
            return false;
        }
        if (!item.status || item.name.trim() === '') {
            setError('Status is required');
            return false;
        }
        if (!item.link || !isValidURL(item.link)) {
            setError('Link must be a valid URL');
            return false;
        }
        return true;
    };

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateItem()) {
            return;
        }

        try {
            console.log('Sending update request for item:', id, item);
            const response = await axios.put(`http://localhost:3001/items/${id}`, item);
            console.log('Update response:', response.data);
            navigate('/');
        } catch (err) {
            console.error('Error updating item:', err.response || err);
            setError(err.response?.data?.error || 'Error updating item');
        }
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block mb-1">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block mb-1">Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={item.status}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="link" className="block mb-1">Link</label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={item.link}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Item
                </button>
            </form>
        </div>
    );
};

export default EditItem;