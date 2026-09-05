import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => fetchProducts());
  };

  const updateProductPrice = (id, price) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then(() => fetchProducts());
  };

  const deleteProduct = (id) => {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(() => fetchProducts());
  };

  return { products, loading, addProduct, updateProductPrice, deleteProduct };
}