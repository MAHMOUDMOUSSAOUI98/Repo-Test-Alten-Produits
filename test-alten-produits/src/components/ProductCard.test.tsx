// import { render, screen, fireEvent } from '@testing-library/react';
// import ProductCard from './ProductCard';
// import type { Product } from '../types';

// const mockProduct: Product = {
//   id: '1',
//   name: 'Test Produit',
//   description: 'Description du produit de test.',
//   price: 99.99,
// };

// describe('ProductCard', () => {
//   it('should display product information', () => {
//     render(
//       <ProductCard
//         product={mockProduct}
//         isAdmin={false}
//         onEdit={() => {}}
//         onDelete={() => {}}
//       />
//     );
//     expect(screen.getByText('Test Produit')).toBeInTheDocument();
//     expect(screen.getByText('Description du produit de test.')).toBeInTheDocument();
//     expect(screen.getByText('99.99 €')).toBeInTheDocument();
//   });

//   it('should not show edit/delete buttons when not admin', () => {
//     render(
//       <ProductCard
//         product={mockProduct}
//         isAdmin={false}
//         onEdit={() => {}}
//         onDelete={() => {}}
//       />
//     );
//     expect(screen.queryByRole('button', { name: /Modifier/i })).not.toBeInTheDocument();
//     expect(screen.queryByRole('button', { name: /Supprimer/i })).not.toBeInTheDocument();
//   });

//   it('should show edit/delete buttons when admin', () => {
//     render(
//       <ProductCard
//         product={mockProduct}
//         isAdmin={true}
//         onEdit={() => {}}
//         onDelete={() => {}}
//       />
//     );
//     expect(screen.getByRole('button', { name: /Modifier/i })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Supprimer/i })).toBeInTheDocument();
//   });

//   it('should call onEdit when edit button is clicked', () => {
//     const mockOnEdit = jest.fn();
//     render(
//       <ProductCard
//         product={mockProduct}
//         isAdmin={true}
//         onEdit={mockOnEdit}
//         onDelete={() => {}}
//       />
//     );
//     fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
//     expect(mockOnEdit).toHaveBeenCalledTimes(1);
//     expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
//   });

//   it('should call onDelete when delete button is clicked and confirmed', () => {
//     const mockOnDelete = jest.fn();
//     jest.spyOn(window, 'confirm').mockReturnValue(true);

//     render(
//       <ProductCard
//         product={mockProduct}
//         isAdmin={true}
//         onEdit={() => {}}
//         onDelete={mockOnDelete}
//       />
//     );
//     fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));
//     expect(mockOnDelete).toHaveBeenCalledTimes(1);
//     expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);

//     jest.spyOn(window, 'confirm').mockRestore();
//   });

// });