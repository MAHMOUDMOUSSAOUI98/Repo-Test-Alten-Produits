import React, { useState } from 'react'; // Importez useState
import {
  Box,
  Typography,
  Button,
  TextField // Importez TextField pour la barre de recherche
} from '@mui/material';
import type { Product } from '../types/index';

interface ProductListProps {
  products: Product[];
  isAdmin: boolean;
  onDeleteProduct: (id?: string) => Promise<void>;
  onAddProductClick: () => void;
  onEditProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isAdmin,
  onDeleteProduct,
  onAddProductClick,
  onEditProductClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Gère le changement dans la barre de recherche
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtrage des produits basés sur le terme de recherche
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {isAdmin && (
        <Button variant="contained" onClick={onAddProductClick} sx={{ mb: 2 }}>
          Ajouter un nouveau produit
        </Button>
      )}

      <TextField
        label="Rechercher des produits"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }} // Marge en bas pour espacer du reste
      />

      {filteredProducts.length === 0 && products.length > 0 ? (
        <Typography>Aucun produit ne correspond à votre recherche.</Typography>
      ) : filteredProducts.length === 0 && products.length === 0 ? (
        <Typography>Aucun produit disponible.</Typography>
      ) : (
        <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {filteredProducts.map((product) => (
            <Box
              component="li"
              key={product.id}
              sx={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography variant="body1" sx={{ mb: isAdmin ? 1 : 0 }}>
                Prix: {product.price}€
              </Typography>

              {isAdmin && (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  mt: 1,
                }}>
                  <Button variant="outlined" size="small" onClick={() => onEditProductClick(product)}>Modifier</Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => onDeleteProduct(product.id)}>Supprimer</Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;