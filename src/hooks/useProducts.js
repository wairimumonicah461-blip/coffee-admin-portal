import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    return fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => fetchProducts());
  };

  const updateProductPrice = (id, price) => {
    return fetch(`http://localhost:3001/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then(() => fetchProducts());
  };

  const deleteProduct = (id) => {
    return fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' }).then(() => fetchProducts());
  };

  return { products, loading, addProduct, updateProductPrice, deleteProduct };
}