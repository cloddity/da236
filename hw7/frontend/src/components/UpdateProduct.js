import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProduct = ({ product, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    quantity: product.quantity
  });

  const { name, price, category, quantity } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3000/api/products/${product._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onProductUpdated(res.data);
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
        name="price"
        value={price}
        onChange={onChange}
        placeholder="Product Price"
        required
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={onChange}
        placeholder="Product Category"
        required
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={onChange}
        placeholder="Product Quantity"
        required
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;