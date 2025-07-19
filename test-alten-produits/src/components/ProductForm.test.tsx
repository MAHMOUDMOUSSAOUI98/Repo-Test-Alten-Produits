// import { render, screen, fireEvent } from '@testing-library/react';
// import ProductForm from './ProductForm';
// import type { Product } from '../types';

// const mockProduct: Product = {
//   id: '1',
//   name: 'Old Product Name',
//   description: 'Old Description',
//   price: 100,
// };

// describe('ProductForm', () => {
//   it('should render form for new product creation', () => {
//     render(<ProductForm onSubmit={() => {}} onCancel={() => {}} />);
//     expect(screen.getByLabelText(/Nom du Produit/i)).toHaveValue('');
//     expect(screen.getByLabelText(/Description/i)).toHaveValue('');
//     expect(screen.getByLabelText(/Prix/i)).toHaveValue(0);
//     expect(screen.getByRole('button', { name: /Ajouter/i })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Annuler/i })).toBeInTheDocument();
//   });

//   it('should render form with existing product data for editing', () => {
//     render(<ProductForm product={mockProduct} onSubmit={() => {}} onCancel={() => {}} />);
//     expect(screen.getByLabelText(/Nom du Produit/i)).toHaveValue('Old Product Name');
//     expect(screen.getByLabelText(/Description/i)).toHaveValue('Old Description');
//     expect(screen.getByLabelText(/Prix/i)).toHaveValue(100);
//     expect(screen.getByRole('button', { name: /Modifier/i })).toBeInTheDocument();
//   });

//   it('should update form fields on user input', () => {
//     render(<ProductForm onSubmit={() => {}} onCancel={() => {}} />);
//     const nameInput = screen.getByLabelText(/Nom du Produit/i);
//     const descriptionInput = screen.getByLabelText(/Description/i);
//     const priceInput = screen.getByLabelText(/Prix/i);

//     fireEvent.change(nameInput, { target: { name: 'name', value: 'New Name' } });
//     fireEvent.change(descriptionInput, { target: { name: 'description', value: 'New Desc' } });
//     fireEvent.change(priceInput, { target: { name: 'price', value: '123.45' } });

//     expect(nameInput).toHaveValue('New Name');
//     expect(descriptionInput).toHaveValue('New Desc');
//     expect(priceInput).toHaveValue(123.45);
//   });

//   it('should call onSubmit with new product data on submission', () => {
//     const mockOnSubmit = jest.fn();
//     render(<ProductForm onSubmit={mockOnSubmit} onCancel={() => {}} />);

//     fireEvent.change(screen.getByLabelText(/Nom du Produit/i), {
//       target: { name: 'name', value: 'New Product' },
//     });
//     fireEvent.change(screen.getByLabelText(/Description/i), {
//       target: { name: 'description', value: 'New Desc' },
//     });
//     fireEvent.change(screen.getByLabelText(/Prix/i), {
//       target: { name: 'price', value: '50.00' },
//     });

//     fireEvent.click(screen.getByRole('button', { name: /Ajouter/i }));

//     expect(mockOnSubmit).toHaveBeenCalledTimes(1);
//     expect(mockOnSubmit).toHaveBeenCalledWith({
//       id: '',
//       name: 'New Product',
//       description: 'New Desc',
//       price: 50,
//     });
//   });

//   it('should call onSubmit with updated product data on submission', () => {
//     const mockOnSubmit = jest.fn();
//     render(<ProductForm product={mockProduct} onSubmit={mockOnSubmit} onCancel={() => {}} />);

//     fireEvent.change(screen.getByLabelText(/Nom du Produit/i), {
//       target: { name: 'name', value: 'Updated Name' },
//     });
//     fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));

//     expect(mockOnSubmit).toHaveBeenCalledTimes(1);
//     expect(mockOnSubmit).toHaveBeenCalledWith({
//       ...mockProduct,
//       name: 'Updated Name',
//     });
//   });

//   it('should call onCancel when cancel button is clicked', () => {
//     const mockOnCancel = jest.fn();
//     render(<ProductForm onSubmit={() => {}} onCancel={mockOnCancel} />);
//     fireEvent.click(screen.getByRole('button', { name: /Annuler/i }));
//     expect(mockOnCancel).toHaveBeenCalledTimes(1);
//   });
// });