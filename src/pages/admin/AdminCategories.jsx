import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/categories');
      setCategories(res.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingCategory) {
        await axios.put(
          `http://localhost:8000/api/categories/${editingCategory.id}`,
          { name },
          config
        );
        alert('Category updated successfully!');
      } else {
        await axios.post(
          'http://localhost:8000/api/categories',
          { name },
          config
        );
        alert('Category added successfully!');
      }

      setName('');
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      setErrors(error.response?.data?.errors || { message: 'An error occurred' });
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Category deleted successfully!');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingCategory(category);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Categories</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter category name"
            required
          />
          {errors &&
            Object.entries(errors).map(([field, messages]) =>
              Array.isArray(messages) ? (
                messages.map((msg, i) => (
                  <p key={`${field}-${i}`} className="text-red-500 text-xs">
                    {msg}
                  </p>
                ))
              ) : (
                <p key={field} className="text-red-500 text-xs">
                  {messages}
                </p>
              )
            )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editingCategory ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No categories found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminCategories;
