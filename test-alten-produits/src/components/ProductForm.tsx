import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { TextField, Button, Box } from '@mui/material';

interface ProductFormProps {
  product?: Product; // Optionnel, pour la modification
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || '',
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
  });

  // Mettre à jour le formulaire si un produit est passé pour modification
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      // Réinitialiser pour un nouveau produit
      setFormData({ id: '', name: '', description: '', price: 0 });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value, // Convertir le prix en nombre
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Nom du Produit"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <TextField
        label="Prix"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        inputProps={{ step: "0.01" }} // Pour les centimes
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onCancel} sx={{ mr: 1 }}>
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          {product?.id ? 'Modifier' : 'Ajouter'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;