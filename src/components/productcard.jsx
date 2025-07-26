import React from 'react'
import { Link } from 'react-router'

function productcard({ product }) {
    return (

        <Link to={'/products/'+ product.id }>
            <div className="bg-white p-4 rounded-lg shadow-md">
          
  
<img
  src={product.image}
  alt="Product Image"
  className="w-full h-56 object-cover rounded-md"
/>

            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold text-indigo-600">{product.price}</span>
                  
                </div>
            </div>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-indigo-700">Add to Cart</button>
        </div></Link>
    )
}

export default productcard