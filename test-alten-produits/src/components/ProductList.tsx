// src/components/ProductList.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
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
  return (
    <Box sx={{ p: 3 }}>
      {isAdmin && (
        <Button variant="contained" onClick={onAddProductClick} sx={{ mb: 2 }}>
          Ajouter un nouveau produit
        </Button>
      )}

      {products.length === 0 ? (
        <Typography>Aucun produit disponible.</Typography>
      ) : (
        <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {products.map((product) => (
            <Box
              component="li"
              key={product.id}
              sx={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                // Pas de flexbox sur le li lui-même ici, pour que le contenu s'empile naturellement
              }}
            >
              {/* Informations du produit - elles s'afficheront en bloc, les unes sous les autres */}
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography variant="body1" sx={{ mb: isAdmin ? 1 : 0 }}> {/* Ajout d'une petite marge en bas si les boutons sont présents */}
                Prix: {product.price}€
              </Typography>

              {/* Conteneur des boutons : Utilisez Flexbox pour les aligner à droite */}
              {isAdmin && (
                <Box sx={{
                  display: 'flex',           // Active Flexbox pour ce conteneur
                  justifyContent: 'flex-end', // Pousse les éléments (boutons) à l'extrême droite
                  gap: 1,                    // Ajoute un petit espace entre les boutons
                  mt: 1,                     // Ajoute une petite marge au-dessus des boutons
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