import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedItems = (items) => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredItems = getSortedItems(items.filter((item) => {
    return (
      item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.minPrice === '' || item.price >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === '' || item.price <= parseFloat(filters.maxPrice))
    );
  }));

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const tableStyle = {
    tableLayout: 'fixed',
    width: '100%',
  };

  const columnStyles = {
    id: { width: '8%' },
    name: { width: '25%' },
    price: { width: '8%' },
    status: { width: '8%' },
    link: { width: '25%' },
    updatedAt: { width: '13%' },
    createdAt: { width: '13%' },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Items</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />

      </div>

      <div className="overflow-x-auto">
        <table style={tableStyle} className="bg-white">
          <thead>
            <tr>
              {Object.entries(columnStyles).map(([key, style]) => (
                <th key={key} style={style} className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleSort(key)}
                    className="font-bold text-left focus:outline-none text-sm sm:text-base w-full"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td style={columnStyles.id} className="py-2 px-4 border-b text-sm sm:text-base">{item.id}</td>
                <td style={columnStyles.name} className="py-2 px-4 border-b text-sm sm:text-base">{item.name}</td>
                <td style={columnStyles.price} className="py-2 px-4 border-b text-sm sm:text-base">{item.price} €</td>
                <td style={columnStyles.status} className="py-2 px-4 border-b text-sm sm:text-base">{item.status}</td>
                <td style={columnStyles.link} className="py-2 px-4 border-b text-sm sm:text-base">
                  <div style={{ wordBreak: 'break-word' }}>{item.link}</div>
                </td>
                <td style={columnStyles.updatedAt} className="py-2 px-4 border-b text-sm sm:text-base">{item.updatedAt}</td>
                <td style={columnStyles.createdAt} className="py-2 px-4 border-b text-sm sm:text-base">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;