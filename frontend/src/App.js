import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './component/ItemList';
import CreateItem from './component/CreateItem';
import EditItem from './component/EditItem';
import SystemInfo from './component/SystemInfo';
import SearchItem from "./component/SearchItem";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
            </li>
            <li>
              <Link to="/create" className="text-blue-500 hover:text-blue-700">Create Item</Link>
            </li>
            <li>
              <Link to="/find-and-edit" className="text-blue-500 hover:text-blue-700">Find Item</Link>
            </li>
            <li>
              <Link to="/system/info" className="text-blue-500 hover:text-blue-700">System Info</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/find-and-edit" element={<SearchItem />} />
          <Route path="/system/info" element={<SystemInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;