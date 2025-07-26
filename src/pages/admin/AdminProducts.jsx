import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

function AdminProducts() {
  const [items, setitems] = useState([]); // State to store orders

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setitems(res.data.products)
        console.log(res.data.products); // Log the orders to the console for debugging
      }
      ) // Store orders in state

  }, []); // Dependency array ensures this runs once
  let handledelete = async (id) => {
    let res = await axios.delete(`http://localhost:8000/api/products/` + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }



    });
    if (res.data.message === "product delete successful") {
      setitems(items => items.filter(item => item.id !== id));
      
      alert("Product deleted successfully");

    }
  }
  return (
    <>
      <div className="container mx-auto ">


        <h1 className="text-3xl font-bold mb-8  text-gray-800 ">Admin Products</h1>
        <div className='flex '> <Link to={"/admin/AdminProducts/AdminProductscreate"} className='bg-blue-400 p-2 rounded-xl mb-2 px-3 text-amber-50'><p>Create</p></Link></div>
        {items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border">
            <thead classNmae="w-full">
              <tr className="border-b bg-gray-100 text-gray-600">
                <th className="bg-gray-100  text-left p-4 font-semibold text-gray-600">ID</th>
                <th className="bg-gray-100 text-left p-4 font-semibold text-gray-600">Image</th>
                <th className="bg-gray-100  text-left p-4 font-semibold text-gray-600">Name</th>
                <th className="bg-gray-100 text-left p-4 font-semibold text-gray-600">Description</th>
                <th className="bg-gray-100 text-center p-4 px-9 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{item.id}</td>
                  <td className="p-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <img
                      src={item.images.length ? item.images[0].url : ''}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  {/* <td className="p-4 text-gray-700">${order.total_amount.toFixed(2)}</td>
                */}
                  <td className="p-4 text-gray-700">{item.name}</td>
                  <td className="p-4 text-gray-700">{item.description}</td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                                         <Link to={"/admin/AdminProducts/" + item.id + '/edit'} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">Edit</Link>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handledelete(item.id);
                    }}>


                      <button onClick={()=>handledelete}className='bg-red-600 text-amber-50 p-1.5 rounded-xl hover:text-red-950 '>delete</button>
                    </form>
                  </td>
                  <td className="p-4 text-gray-700">





                  </td>

                </tr>
              ))}
            </tbody>
            </table>
          </div>
      ) : (
      <p className="text-gray-600">No orders found.</p>
        )}
    </div ></>

  );
}

export default AdminProducts;