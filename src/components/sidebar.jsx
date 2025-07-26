import React from 'react'
import { Link } from 'react-router'


function sidebar() {
  return (
    <div className="w-35 bg-gray-800 text-white flex flex-col md:w-64 h-screen">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-6">
        <ul className="space-y-4">
          <li>
            <Link to="/admin/orders" className="hover:text-gray-300">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/AdminProducts" className="hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/AdminCategories" className="hover:text-gray-300">
              Categories
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  )
}

export default sidebar