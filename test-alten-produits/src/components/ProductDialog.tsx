import React from 'react';
import type { Product } from '../types';
import ProductForm from './ProductForm';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product; // Produit à modifier (optionnel, pour l'ajout)
  onSubmit: (product: Product) => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  product,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product?.id ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</DialogTitle>
      <DialogContent>
        <ProductForm
          product={product}
          onSubmit={(data) => {
            onSubmit(data);
            onClose(); // Fermer après soumission
          }}
          onCancel={onClose} // Fermer si annulé
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;