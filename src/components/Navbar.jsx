import { Link } from 'react-router-dom';

export default function Navbar() {
  const linkStyle = {
    background: '#1abc9c',
    color: '#fff',
    padding: '.5rem 1.2rem',
    borderRadius: 20,
    textDecoration: 'none',
    fontWeight: 500,
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/shop" style={linkStyle}>Shop</Link>
      <Link to="/admin" style={linkStyle}>Admin Portal</Link>
    </nav>
  );
}