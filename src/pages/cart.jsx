import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/Cartcontext'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
const checkoutSchema=z.object({
 shipping_address:z.string().min(10, "Must be at least 10").max(150,"Should not be greater than 150 "),
  note : z.string()
})
function Cart() {
  let { products, setProducts } = useContext(CartContext)
  const navigate = useNavigate(); // Initialize navigate
  let [total, setTotal] = useState(0)
  let [order_products, setOrderProducts] = useState([]) // ✅ Used for order API
 
 
  let [screen_shot, setScreenshot] = useState(null)
 const {register, handleSubmit, formState} = useForm({
  resolver : zodResolver(checkoutSchema)
 });
  let removeItem = (product) => {
    let newCartItems = products.filter((p) => p.id !== product.id)
    setProducts(newCartItems)
    localStorage.setItem('products', JSON.stringify(newCartItems))
  }
 useEffect(()=>{
  let _total=0;
  if(products.length){
    products.forEach(product=>{
      _total+= product.price*product.quatity;
    })
    setTotal(_total)
  }else{
    setTotal(0);
  }
 },[products])
 
  useEffect(() => {
    let _total = 0
    if (products.length) {
      products.forEach((product) => {
        _total += product.price * product.quantity
      })
      setTotal(_total);
     setOrderProducts( products.map((product)=> {
      return{
        product_id: product.id,
        quantity: product.quantity
      }
    }));
    } else {
      setTotal(0)
    }
  }, [products])

  // ✅ Sync order_products with current products
 
let createorder = async (data, event) => {
  event.preventDefault(); // Prevent default form submission behavior
  try {
    let order = {
      order_products,
      shipping_address: data.shipping_address, // Extract from form data
      notes: data.note, // Extract from form data
      screen_shot,
      total_amount: total, // Use the calculated total
    };
        let res = await axios.post('http://localhost:8000/api/orders', order, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(res.data.message === 'order create successful.'){
          alert('Order created successfully');
          setProducts([]);
          localStorage.setItem("products", JSON.stringify([])); // Clear cart after order creation
          navigate('/orders'); // Use navigate from useNavigate hook
        }
        console.log(order)
      } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2">
        <div className="md:col-span-2">
  {products && products.length > 0 ? (
    products.map((product) => (
      <div
        key={product.id}
        className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4"
      >
        <Link to={'/products/' + product.id}>
          <img
            src={product.image}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-md"
          />
        </Link>
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {product.title}
          </h2>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-indigo-600 font-bold">
             ${product.price}
            </span>
            <span className="text-gray-500">
            ${
              product.price} * {product.quantity}=${product.price * product.quantity}
            
            </span>
            <button
              onClick={() => removeItem(product)}
              className="bg-red-500 rounded-sm pr-2 py-1 pb-2 pl-2 text-m"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-600">No products in the cart.</p>
  )}
</div>
<div className="bg-white p-6 rounded-lg shadow-md">
<h2 className="text-xl font-bold mb-4">Order Summary</h2>
<div className="flex justify-between mb-2">
  <span>Subtotal</span>
  <span>${total}</span>
</div>

<div className="flex justify-between font-bold text-lg">
  <span>Total</span>
  <span>${(total )}</span>

</div>
<form onSubmit={handleSubmit(createorder)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Shipping Address
              </label>
             <textarea {...register('shipping_address')} 
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your shipping address"
                
              ></textarea>
               {formState.errors.shipping_address && ( <p className='text-red-500'>
                {formState.errors.shipping_address.message}
               </p>)}
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Notes</label>
              <textarea
                 {...register('note')}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter any additional notes"
              ></textarea>
              
         

            </div>

            {/* Screenshot Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Upload Screenshot (Optional)
              </label>
              {/* <input
                type="file"
                onChange={(e) => setScreenshot(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
              /> */}
            </div>

            <button
              type="submit" // ✅ Fix: prevent form from refreshing
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            >
              Submit Order
            </button>
          </form>
</div>

          {/* Shipping Address */}
         
        </div>
      </div>
    </div>
  )
}

export default Cart 