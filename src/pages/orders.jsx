import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]); // State to store orders

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get("http://localhost:8000/api/user_orders", {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        })
        .then((res) => setOrders(res.data.orders))
        .catch((err) => console.error(err));
    }
  }, []);

  // Function to style the status dynamically
  const getStatusDesign = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-4 font-semibold text-gray-600">Order ID</th>
                <th className="text-left p-4 font-semibold text-gray-600">Products</th>
                <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                <th className="text-left p-4 font-semibold text-gray-600">Total</th>
                <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                <th className="text-left p-4 font-semibold text-gray-600">Notes</th>
                <th className="text-left p-4 font-semibold text-gray-600">Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 align-top">
                  <td className="p-4 text-gray-700">{order.id}</td>
                  <td className="p-4 text-gray-700">
                    {order.products && order.products.length > 0 ? (
                      <ul className="list-disc ml-4">
                        {order.products.map((product) => (
                          <li key={product.id}>
                            {product.name} × {product.pivot?.quantity || 1}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No products</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-700">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-gray-700">${order.total_amount.toFixed(2)}</td>
                  <td className="p-4 text-gray-700">
                    <span className={`px-2 py-1 rounded text-sm ${getStatusDesign(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{order.notes || 'N/A'}</td>
                  <td className="p-4 text-gray-700">{order.address || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
}

export default Orders;
