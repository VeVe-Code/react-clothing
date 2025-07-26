import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

function AdminOrdersdetail() {
  const [orders,setorders]= useState(null);
  const{id }= useParams();
  console.log(id)
  const navigate = useNavigate();
useEffect(() => {
 
    axios
      .get(`http://localhost:8000/api/orders/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setorders(res.data.order);
        // Log the orders to the console for debugging
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      }); // Handle errors
    }, [id]); // Add id as a dependency
console.log(orders);
let confirmorder =  () => {
  axios.put(`http://localhost:8000/api/orders/${id}`,{status: 'confirmed'} , {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }).then (res => {console.log(res.data)
    alert("order confirmed successfully")
    navigate('/admin/orders')
  })
}
return (
  <div>{!orders ? <p>loading...</p>:
  <>
  <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>

     
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      
        <br />
        <h2 className="text-xl font-bold mb-4">Order Information</h2>
        <p><strong>Order ID:</strong> {orders.id}</p>
        <p><strong>Status:</strong><span
  className={`capitalize px-3 py-0.5 rounded ${
    orders.status === 'pending' ? 'bg-amber-400 text-amber-50' : orders.status === 'confirmed' ? 'bg-green-400 text-green-50' : orders.status === 'Cancelled' ? 'bg-red-400 text-red-50' : 'bg-gray-400 text-gray-50'
  }`}
>
  {orders.status}
</span></p>
        <p><strong>Total Amount:</strong> ${orders.total_amount}</p>
        <p><strong>Created At:</strong> {new Date(orders.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(orders.updated_at).toLocaleString()}</p>
        <p><strong>Address:</strong> {orders.address}</p>
        <p><strong>Notes:</strong> {orders.notes}</p>
        
           
           
             <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Products</h2>
      
         {orders.products && orders.products.length > 0 ? (
  <ul>
    {orders.products.map((product) => (
      <div> <li key={product.id}>  
       <p><strong>Product Image:</strong> {product.image}</p>
           <p><strong>Product Name:</strong> {product.name}</p>
                  <p><strong>Quantity:</strong> {product.quantity}</p>
                  <p><strong>Price:</strong> ${product.price}</p></li>
      <div>
               
    </div></div>
     
    ))}
  </ul>
) : (
  <p>No products found in this order.</p>
)}
    
      </div>
          </div>
        
      
    <div>{orders.status==='pending' &&  <button onClick={()=> confirmorder()} className='capitalize px-3 py-0.5 rounded bg-green-400 text-amber-50 '>confirm</button>}</div> </>}</div>
          )
}
export default AdminOrdersdetail;