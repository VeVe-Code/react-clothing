import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';

function AdminOrders() {
  const [orders, setorders] = useState([]);

  const [id, setid] = useState(null)
 const [isdelete, setisdelete] = useState(false)
 const deleteorders = () => {
  if (!id) return;
  axios.delete(`http://localhost:8000/api/orders/${id}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }).then(res => {
    console.log(res.data)
    // setorders(orders.filter(order => order.id !== id))
    setisdelete(false);
    setid(null);
  }) 
  let neworders = orders.filter((order) => order.id !== id)
  setorders(neworders)
  alert("order deleted successfully")
 }
useEffect(() => {
  axios.get('http://localhost:8000/api/orders',{
    headers: {
     
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  }).then(res => {setorders(res.data.orders)
    console.log(res.data.orders)
  })},[])
return (
    <> <div>AdminOrders</div>
    <div className="flex flex-col md:flex-row">
       <div
  className={`fixed inset-0 z-50 bg-black/85 text-amber-50 ${
    isdelete ? 'flex' : 'hidden'
  } items-center justify-center`}
>
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
    <h2 className="text-xl font-bold mb-2">Are you sure to delete this order?</h2>
    <p className="mb-6 text-sm text-gray-300">This action can't be undone.</p>
    <div className="flex justify-center gap-4">
      <button onClick={()=> {setisdelete(false);
        setid(null);
      }} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
      <button onClick={deleteorders} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
    </div>
  </div>

     
       
        </div>
      
        <div className="flex-1 p-4">
        
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Total Amount</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.user.name}</td>
                  
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">{order.total_amount}</td>
                  <td className="border px-4 py-2">{order.address}</td>
                  <td className="border px-4 py-2 "> 
                  <Link to={`/admin/orders/${order.id}`} className="text-blue-600 mr-2">View</Link>
                 
                 <button onClick={() => { setisdelete(true); setid(order.id); }} className="text-red-600 mr-2">Delete</button></td>
                </tr>
                
              ))}
            
            </tbody>
          </table>
        </div>
      </div>  
    </>
   
        )}
export default AdminOrders;