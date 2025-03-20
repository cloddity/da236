import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    category: ''
  });

  const { name, quantity, price, category } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onProductAdded(res.data);
      setFormData({ name: '', quantity: '', price: '', category: '' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Product Name"
        required
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={onChange}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        name="price"
        value={price}
        onChange={onChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={onChange}
        placeholder="Category"
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;