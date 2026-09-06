import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Shop from './Shop';
import * as useProductsHook from '../hooks/useProducts';

describe('Shop page', () => {
  const mockProducts = [
    { id: 1, name: 'Ethiopian Yirgacheffe', description: 'Bright and floral', price: 14.99 },
    { id: 2, name: 'Colombian Supremo', description: 'Balanced and nutty', price: 12.5 },
  ];

  beforeEach(() => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: mockProducts,
    });
  });

  it('renders all products', () => {
    render(<Shop />);
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
    expect(screen.getByText('Colombian Supremo')).toBeInTheDocument();
  });

  it('filters products based on search input', async () => {
    render(<Shop />);
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'colombian' } });

    await waitFor(() => {
      expect(screen.queryByText('Ethiopian Yirgacheffe')).not.toBeInTheDocument();
      expect(screen.getByText('Colombian Supremo')).toBeInTheDocument();
    });
  });
});