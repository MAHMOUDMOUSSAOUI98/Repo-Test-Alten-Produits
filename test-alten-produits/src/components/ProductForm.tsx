// src/components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import type { Product } from '../types/index';

interface ProductFormProps {
  initialData?: Product; // Pour pré-remplir le formulaire en mode édition
  onSubmit: (productData: Product) => void; // Fonction appelée quand le formulaire est soumis
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Product>({
    id: initialData?.id || undefined, // Garde l'ID si c'est une modification
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
  });

  // Mettre à jour le formData si initialData change (quand on ouvre le dialogue pour éditer un autre produit)
  useEffect(() => {
    setFormData({
      id: initialData?.id || undefined,
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'price' ? parseFloat(value) || 0 : value, // Convertir le prix en nombre
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Appelle la fonction onSubmit (handleFormSubmit de ProductDialog) avec les données
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        autoFocus // Met le focus sur ce champ quand le dialogue s'ouvre
        margin="dense"
        id="name"
        label="Nom du produit"
        type="text"
        fullWidth
        variant="standard"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        type="text"
        fullWidth
        multiline
        rows={3}
        variant="standard"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <TextField
        margin="dense"
        id="price"
        label="Prix"
        type="number"
        fullWidth
        variant="standard"
        value={formData.price}
        onChange={handleChange}
        inputProps={{ step: "0.01" }} // Permet d'entrer des nombres décimaux
        required
      />
      {/* Bouton de soumission du formulaire, dans le formulaire lui-même */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" color="primary">
          Sauvegarder
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;