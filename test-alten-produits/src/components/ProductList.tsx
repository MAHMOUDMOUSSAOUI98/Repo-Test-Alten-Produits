import React, { useState } from 'react';
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
import ProductCard from './ProductCard'; 

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
  const [sortBy, setSortBy] = useState<string>('name-asc');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value as string);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        return 0;
    }
  });

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

      {sortedProducts.length === 0 && products.length > 0 ? (
        <Typography>Aucun produit ne correspond à votre recherche.</Typography>
      ) : sortedProducts.length === 0 && products.length === 0 ? (
        <Typography>Aucun produit disponible.</Typography>
      ) : (
        <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onDeleteProduct={onDeleteProduct}
              onEditProductClick={onEditProductClick}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;