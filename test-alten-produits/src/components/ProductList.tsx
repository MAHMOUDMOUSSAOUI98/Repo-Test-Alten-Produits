import React, { useState } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import ProductDialog from './ProductDialog';
import { Box, Grid, Typography, Button } from '@mui/material';

interface ProductListProps {
  products: Product[];
  isAdmin: boolean;
  onUpdateProducts: (updatedProducts: Product[]) => void; // Callback pour mettre à jour les produits
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isAdmin,
  onUpdateProducts,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      onUpdateProducts(updatedProducts);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(undefined); // Pour un nouveau produit
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (productData: Product) => {
    if (productData.id) {
      // Modification d'un produit existant
      const updatedProducts = products.map((p) =>
        p.id === productData.id ? productData : p
      );
      onUpdateProducts(updatedProducts);
    } else {
      // Ajout d'un nouveau produit
      const newProduct: Product = {
        ...productData,
        id: String(Date.now()), // Générer un ID simple (pour l'exemple)
      };
      onUpdateProducts([...products, newProduct]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Liste des Produits
      </Typography>

      {isAdmin && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleAddProduct}>
            Ajouter un Produit
          </Button>
        </Box>
      )}

      {products.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          Aucun produit disponible.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item  key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ProductDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default ProductList;