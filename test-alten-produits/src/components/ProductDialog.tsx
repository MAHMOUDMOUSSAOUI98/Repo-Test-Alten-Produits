// src/components/ProductDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductForm from './ProductForm'; // Importez votre ProductForm
import type { Product } from '../types/index';

interface ProductDialogProps {
  open: boolean; // État d'ouverture/fermeture du dialogue (vient de App.tsx)
  product?: Product; // Le produit à éditer (undefined pour un nouvel ajout)
  onClose: () => void; // Fonction pour fermer le dialogue (vient de App.tsx)
  onSave: (product: Product) => Promise<void>; // Fonction de sauvegarde qui vient de App.tsx
}

const ProductDialog: React.FC<ProductDialogProps> = ({ open, product, onClose, onSave }) => {
  const handleFormSubmit = async (formData: Product) => {
    try {
      await onSave(formData); // Appelle la fonction onSave reçue de App.tsx
      // La fermeture du dialogue est gérée par la fonction onSave elle-même dans App.tsx
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire dans le dialogue:", error);
      // La fonction onSave est censée déjà afficher une alerte.
      // Si une erreur se produit ici et que vous ne voulez pas fermer le dialogue, vous pouvez le gérer.
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? 'Modifier le Produit' : 'Ajouter un nouveau Produit'}</DialogTitle>
      <DialogContent>
        {/* Passe le produit initial et la fonction de soumission à ProductForm */}
        <ProductForm
          initialData={product} // Passe les données pour l'édition (ou undefined pour ajout)
          onSubmit={handleFormSubmit} // ProductForm appellera cette fonction quand il sera soumis
        />
      </DialogContent>
      <DialogActions>
        {/* Le bouton "Annuler" du dialogue. Le bouton "Sauvegarder" est dans ProductForm. */}
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;