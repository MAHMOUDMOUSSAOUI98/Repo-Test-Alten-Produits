import React, { useState } from 'react'; // Importez useState
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

  const [sortBy, setSortBy] = useState<string>('name-asc'); // Valeur par défaut: tri par nom croissant

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtrage des produits basés sur le terme de recherche
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- LOGIQUE DE TRI ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0; // Aucun tri si la valeur n'est pas reconnue
    }
  });
  // --- FIN LOGIQUE DE TRI ---

  return (
    <Box sx={{ p: 3 }}>
      {isAdmin && (
        <Button variant="contained" onClick={onAddProductClick} sx={{ mb: 2 }}>
          Ajouter un nouveau produit
        </Button>
      )}

      {/* Barre de Recherche */}
      <TextField
        label="Rechercher des produits"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="sort-by-label">Trier par</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by-select"
          value={sortBy}
          label="Trier par"
          onChange={handleSortChange}
        >
          <MenuItem value="name-asc">Nom (A-Z)</MenuItem>
          <MenuItem value="name-desc">Nom (Z-A)</MenuItem>
          <MenuItem value="price-asc">Prix (Croissant)</MenuItem>
          <MenuItem value="price-desc">Prix (Décroissant)</MenuItem>
        </Select>
      </FormControl>

      {/* Logique d'affichage des produits filtrés ou des messages d'absence */}
      {sortedProducts.length === 0 && products.length > 0 ? (
        <Typography>Aucun produit ne correspond à votre recherche.</Typography>
      ) : sortedProducts.length === 0 && products.length === 0 ? (
        <Typography>Aucun produit disponible.</Typography>
      ) : (
        <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {/* Mapper sur les produits triés (sortedProducts) */}
          {sortedProducts.map((product) => (
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