import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(res.data);

        // Decode the token to get the user role
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.role);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
    setShowUpdateProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {userRole === 'admin' && (
        <>
          <button onClick={() => setShowAddProduct(!showAddProduct)}>
            {showAddProduct ? 'Cancel' : 'Create Product'}
          </button>
          {showAddProduct && <AddProduct onProductAdded={handleProductAdded} />}
        </>
      )}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            {userRole === 'admin' && (
              <>
                <button onClick={() => setShowUpdateProduct(product)}>Update</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {showUpdateProduct && (
        <UpdateProduct
          product={showUpdateProduct}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
};

export default Products;