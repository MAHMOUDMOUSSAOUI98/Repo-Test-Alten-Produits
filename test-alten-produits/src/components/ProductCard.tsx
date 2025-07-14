import React from 'react';
import type { Product } from '../types';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          {product.price} €
        </Typography>
      </CardContent>
      {isAdmin && ( // Affiche les actions seulement si l'utilisateur est admin
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={() => onEdit(product)}>
            Modifier
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(product.id)}>
            Supprimer
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProductCard;