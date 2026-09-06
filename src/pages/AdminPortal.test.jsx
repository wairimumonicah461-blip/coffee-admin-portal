import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AdminPortal from './AdminPortal';
import * as useProductsHook from '../hooks/useProducts';

describe('AdminPortal page', () => {
  const mockAddProduct = vi.fn();

  beforeEach(() => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [],
      addProduct: mockAddProduct,
      updateProductPrice: vi.fn(),
      deleteProduct: vi.fn(),
    });
    mockAddProduct.mockClear();
  });

  it('shows an alert and does not call addProduct when fields are empty', () => {
    window.alert = vi.fn();
    render(<AdminPortal />);

    const submitBtn = screen.getByText('Add Product');
    fireEvent.click(submitBtn);

    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields.');
    expect(mockAddProduct).not.toHaveBeenCalled();
  });

  it('calls addProduct with correct data when form is filled out', () => {
    render(<AdminPortal />);

    fireEvent.change(screen.getByPlaceholderText('Product name'), { target: { value: 'Kenyan AA' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Rich and full-bodied' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '15.5' } });

    fireEvent.click(screen.getByText('Add Product'));

    expect(mockAddProduct).toHaveBeenCalledWith({
      name: 'Kenyan AA',
      description: 'Rich and full-bodied',
      price: 15.5,
    });
  });
});