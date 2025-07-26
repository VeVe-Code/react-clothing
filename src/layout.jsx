import React, { useState } from 'react'
import Nav from './components/nav'
import { Outlet } from 'react-router' // ✅ Correct import

function Layout() {
  const [searchTerm, setSearchTerm] = useState('')

  // Function to filter products by search term
  const filterProductbysearch = (search) => {
    setSearchTerm(search)
    console.log('Search Term:', search) // You can use this to debug or pass it to other components
  }

  return (
    <>
     
      <Outlet context={{ searchTerm }} /> {/* Pass searchTerm to child routes if needed */}
    </>
  )
}

export default Layout