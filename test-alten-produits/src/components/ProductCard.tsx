import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onDeleteProduct: (id?: string) => Promise<void>;
  onEditProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  onDeleteProduct,
  onEditProductClick,
}) => {
  return (
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
  );
};

export default ProductCard;