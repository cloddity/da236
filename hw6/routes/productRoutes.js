const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;