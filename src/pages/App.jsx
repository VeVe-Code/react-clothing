import React, { useEffect, useState } from 'react'
import Productcard from '../components/productcard'
import Nav from '../components/nav'
import axios from 'axios'

 

function App() {
  let [product, setproduct] = useState([])

  useEffect(() => {
   fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setproduct(data))
  }, [])

  let filterProductbysearch =(search)=>{
    if(!search) {
      fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setproduct(data))
      return
    }
   let filterproduct= product.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
   setproduct(filterproduct);
  }
 console.log(product)
  return (
    <div>
    
      <Nav  filterProductbysearch={ filterProductbysearch} ></Nav>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Product Listing</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map(products => (<Productcard key={product.id} product={products} />))}
        </div>
      </div>
    </div>
  )
}

export default App
{/* 
 let[product, setproduct]= useState([]);
 useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then (res=> res.json())
    .then(data=> setproduct(data))
  }, []) */}
