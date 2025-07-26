import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function AdminProductsForm() {
  let { id } = useParams()
  const [name, setName] = useState(''); // State for the name input
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(null); // State for error messages
  const Navigate = useNavigate();
  let [categories, setCategory] = useState([]);
 
  
useEffect(() => {
   axios.get('http://localhost:8000/api/categories').then (res => {setCategory(res.data.categories)})

  if(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => {
      if (res.status === 404) {
        Navigate("/404");
      }
      return res.json();
    })
    .then(data => {
      let product = data.product;
      // ✅ Add this line
      setName(data.title);
      setPrice(data.price);
      setCategoryId(data.category_id);
      setDescription(data.description); // Adjusted to match the API response structure
    });
  }
  
}, [id]);
 

let handlesubmit = async (e) => {
 
  
  // Use the useNavigate hook to navigate programmatically
  e.preventDefault(); // Prevent the 
  // idefault form submission behavior
  let product = {
    name,
    price,
    category_id: categoryId,
    description,
  };
  let res;
 if(id){
  res=  await axios.put('http://localhost:8000/api/products/' + id, product,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }})
 }else{

    res = await axios.post('http://localhost:8000/api/products', product, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }
})


}
if (res.data.errors) {
  setErrors(res.data.errors);
  // Log the errors to the console for debugging
  } else {
  if (res.data.message === "product created successful." || res.data.message === "product update successful.") {
    Navigate("/admin/AdminProducts");
    // Show a success message
  }
  }
  
 // Log the errors to the console for debugging

}
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{id? "Edit new" : "create"} Product</h1>
      <form onSubmit={handlesubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the name state
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"

          />
          {errors?.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Price Field */}    
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Update the price state
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product price"

          />
          {errors?.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>

        {/* Category ID Field */}
        <div className="mb-4">

          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)} // Update the category ID state
            className="w-full p-2 border border-gray-300 rounded bg-white"
          
          >

            <option value="">Select Category</option>
            {categories?.map(category => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
           
          </select>
          {errors?.category_id && <p className="text-red-500 text-xs">{errors.category_id}</p>}
        </div>
        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update the description state
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product description"

          ></textarea>
          {errors?.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {id ? "edit" : "Create"} Product
        </button>
      </form>
    </div>
  );
}

export default AdminProductsForm;