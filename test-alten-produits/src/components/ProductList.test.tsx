// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ProductList from './ProductList';
// import type { Product } from '../types';

// jest.mock('./ProductCard', () => ({
//   __esModule: true,
//   default: jest.fn(({ product, isAdmin, onEdit, onDelete }) => (
//     <div data-testid={`product-card-${product.id}`}>
//       <h3>{product.name}</h3>
//       <p>{product.description}</p>
//       <p>{product.price} €</p>
//       {isAdmin && (
//         <>
//           <button onClick={() => onEdit(product)} name="Modifier">Modifier</button>
//           <button onClick={() => onDelete(product.id)} name="Supprimer">Supprimer</button>
//         </>
//       )}
//     </div>
//   )),
// }));

// jest.mock('./ProductDialog', () => ({
//   __esModule: true,
//   default: jest.fn(({ open, onClose, product, onSubmit }) => (
//     open ? (
//       <div data-testid="product-dialog">
//         <h2>{product ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</h2>
//         <input
//           data-testid="dialog-name-input"
//           value={product ? product.name : ''}
//           onChange={(e) => {
//             if (product) {
//               product.name = e.target.value;
//             }
//           }}
//         />
//         <button onClick={() => onSubmit({ ...product, name: 'Updated Name (from dialog)' })} name="Submit Dialog">
//           Submit Dialog
//         </button>
//         <button onClick={onClose} name="Close Dialog">Close Dialog</button>
//       </div>
//     ) : null
//   )),
// }));

// const mockProducts: Product[] = [
//   { id: '1', name: 'Product 1', description: 'Desc 1', price: 10 },
//   { id: '2', name: 'Product 2', description: 'Desc 2', price: 20 },
// ];

// describe('ProductList', () => {
//   it('should display product list and title', () => {
//     render(<ProductList products={mockProducts} isAdmin={false} onUpdateProducts={() => {}} />);
//     expect(screen.getByText(/Liste des Produits/i)).toBeInTheDocument();
//     expect(screen.getByText('Product 1')).toBeInTheDocument();
//     expect(screen.getByText('Product 2')).toBeInTheDocument();
//     expect(screen.queryByRole('button', { name: /Ajouter un Produit/i })).not.toBeInTheDocument();
//   });

//   it('should display "Aucun produit disponible" when product list is empty', () => {
//     render(<ProductList products={[]} isAdmin={false} onUpdateProducts={() => {}} />);
//     expect(screen.getByText(/Aucun produit disponible./i)).toBeInTheDocument();
//   });

//   it('should show "Ajouter un Produit" button when admin', () => {
//     render(<ProductList products={[]} isAdmin={true} onUpdateProducts={() => {}} />);
//     expect(screen.getByRole('button', { name: /Ajouter un Produit/i })).toBeInTheDocument();
//   });

//   it('should open product dialog for new product when "Ajouter" button is clicked', () => {
//     render(<ProductList products={[]} isAdmin={true} onUpdateProducts={() => {}} />);
//     fireEvent.click(screen.getByRole('button', { name: /Ajouter un Produit/i }));
//     expect(screen.getByTestId('product-dialog')).toBeInTheDocument();
//     expect(screen.getByText(/Ajouter un Nouveau Produit/i)).toBeInTheDocument();
//   });

//   it('should handle product deletion', () => {
//     const mockOnUpdateProducts = jest.fn();
//     jest.spyOn(window, 'confirm').mockReturnValue(true);

//     render(<ProductList products={mockProducts} isAdmin={true} onUpdateProducts={mockOnUpdateProducts} />);

//     fireEvent.click(screen.getByTestId('product-card-1').querySelector('button[name="Supprimer"]')!);

//     expect(window.confirm).toHaveBeenCalledTimes(1);
//     expect(mockOnUpdateProducts).toHaveBeenCalledTimes(1);
//     expect(mockOnUpdateProducts).toHaveBeenCalledWith([mockProducts[1]]);

//     jest.spyOn(window, 'confirm').mockRestore();
//   });

//   it('should handle product editing and form submission', async () => {
//     const mockOnUpdateProducts = jest.fn();
//     render(<ProductList products={mockProducts} isAdmin={true} onUpdateProducts={mockOnUpdateProducts} />);

//     fireEvent.click(screen.getByTestId('product-card-1').querySelector('button[name="Modifier"]')!);

//     await waitFor(() => expect(screen.getByTestId('product-dialog')).toBeInTheDocument());
//     expect(screen.getByText(/Modifier le Produit/i)).toBeInTheDocument();

//     fireEvent.click(screen.getByRole('button', { name: /Submit Dialog/i }));

//     expect(mockOnUpdateProducts).toHaveBeenCalledTimes(1);
//     expect(mockOnUpdateProducts).toHaveBeenCalledWith([
//       { ...mockProducts[0], name: 'Updated Name (from dialog)' },
//       mockProducts[1],
//     ]);
// });

//   it('should handle adding a new product via the form', async () => {
//     const mockOnUpdateProducts = jest.fn();
//     render(<ProductList products={[]} isAdmin={true} onUpdateProducts={mockOnUpdateProducts} />);

//     fireEvent.click(screen.getByRole('button', { name: /Ajouter un Produit/i }));
//     await waitFor(() => expect(screen.getByTestId('product-dialog')).toBeInTheDocument());

//     fireEvent.click(screen.getByRole('button', { name: /Submit Dialog/i }));

//     expect(mockOnUpdateProducts).toHaveBeenCalledTimes(1);
//     expect(mockOnUpdateProducts.mock.calls[0][0].length).toBe(1);
//     expect(mockOnUpdateProducts.mock.calls[0][0][0]).toMatchObject({
//       name: 'Updated Name (from dialog)', 
//     });

//   });
// });