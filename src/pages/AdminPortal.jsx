import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function AdminPortal() {
  const { products, addProduct, updateProductPrice, deleteProduct } = useProducts();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editPrices, setEditPrices] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price) {
      alert('Please fill out all fields.');
      return;
    }
    addProduct({ name: name.trim(), description: description.trim(), price: parseFloat(price) });
    setName('');
    setDescription('');
    setPrice('');
  };

  const handleSavePrice = (id) => {
    const newPrice = parseFloat(editPrices[id]);
    if (isNaN(newPrice)) {
      alert('Enter a valid price.');
      return;
    }
    updateProductPrice(id, newPrice);
  };

  return (
    <div style={{ padding: '1rem 2rem', maxWidth: 400 }}>
      <h1>Admin Portal</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }} />
        <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '.5rem', marginBottom: '.5rem' }} />
        <button type="submit" style={{ background: '#1abc9c', color: '#fff', padding: '.5rem 1rem', border: 'none', borderRadius: 20 }}>
          Add Product
        </button>
      </form>

      {products.map((product) => (
        <div key={product.id} style={{ padding: '.75rem', marginBottom: '.75rem' }}>
          <strong>{product.name}</strong>
          <p style={{ margin: '.25rem 0' }}>{product.description}</p>
          <input
            type="number"
            step="0.01"
            placeholder={product.price}
            value={editPrices[product.id] || ''}
            onChange={(e) => setEditPrices((prev) => ({ ...prev, [product.id]: e.target.value }))}
            style={{ width: 80, padding: '.3rem', marginRight: '.5rem' }}
          />
          <button onClick={() => handleSavePrice(product.id)} style={{ marginRight: '.5rem' }}>Save</button>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}