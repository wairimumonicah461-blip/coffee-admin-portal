import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function Shop() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem 2rem', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search products here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '.5rem', marginBottom: '2rem', width: '100%', maxWidth: 300, border: 'none', borderBottom: '1px solid #ccc', outline: 'none', textAlign: 'center' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ padding: '.5rem', minWidth: 150 }}>
            <h3 style={{ margin: '0 0 .3rem' }}>{product.name}</h3>
            <p style={{ margin: '0 0 .3rem', color: '#555' }}>{product.description}</p>
            <p style={{ margin: 0 }}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}