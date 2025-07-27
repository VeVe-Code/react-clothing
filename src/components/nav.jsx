import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/Cartcontext'

function Nav({ filterProductbysearch }) {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    filterProductbysearch(search)
  }, [search])

  const { user, logout } = useContext(AuthContext)
  const { products } = useContext(CartContext)

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-blue-800 font-bold text-xl">
          🛍️ VE Store
        </Link>

        {/* Center: Search */}
        <div className="hidden md:block flex-grow max-w-md mx-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: User, Cart, Hamburger */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-blue-800 hover:text-blue-600">
            🛒
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {products?.length || 0}
            </span>
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-sm text-blue-800 hover:underline">Login</Link>
              <Link to="/register" className="text-sm text-blue-800 hover:underline">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-800">👤 {user.name}</span>
              <button
                onClick={logout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full mb-3 p-2 rounded border border-gray-300 focus:outline-none"
          />

          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-blue-800">Home</Link>
            <Link to="#" className="text-blue-800">Products</Link>
            <Link to="#" className="text-blue-800">Contact</Link>
            <Link to="/cart" className="text-blue-800">Cart</Link>

            {!user ? (
              <>
                <Link to="/login" className="text-blue-800">Login</Link>
                <Link to="/register" className="text-blue-800">Register</Link>
              </>
            ) : (
              <>
                <p className="text-gray-700">👤 {user.name}</p>
                <button onClick={logout} className="text-left text-red-600">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
