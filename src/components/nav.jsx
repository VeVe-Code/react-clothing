import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { CartContext } from '../contexts/Cartcontext'



function Nav({ filterProductbysearch }) {
  let [search, setsearch] = useState('')
  useEffect(() => {
    filterProductbysearch(search)
  }, [search])
 let {user,logout}=useContext(AuthContext);
  console.log(user)

  let{products}=useContext(CartContext);

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">My Store</Link>
        <div className="flex items-center">
          <a href="#" className="text-white px-4">Home</a>
          <a href="#" className="text-white px-4">Products</a>
          <a href="#" className="text-white px-4">Contact</a>
          <input 
            value={search}
            onChange={e => setsearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="ml-4 p-2 border border-gray-300 rounded bg-amber-50 mr-7"
          />
           <Link to="/cart" className="flex items-center text-white px-4">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </svg>




            <span>Shopping Cart</span>
            <span className="ml-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
              {products && products.length} {/* Replace with dynamic cart item count */}
            </span>
          </Link>
          {!user ? 
         <div className="flex items-center space-x-4 mr-7">
         <Link to="/login" className="flex items-center">
            <p className='text-amber-50 '>Login</p>
         </Link>
       
         <Link to="/Register" className="text-white">Register</Link>
       </div>:
        <>
          <div>
            <p className="text-amber-50 mr-4 pr-2.5">{user.name}</p>
          </div>

          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600" 
              onClick={logout}>
              Log out
            </button>
          </div>
        </>
         }
        </div>
      </div>
    </nav>
  )
}

export default Nav