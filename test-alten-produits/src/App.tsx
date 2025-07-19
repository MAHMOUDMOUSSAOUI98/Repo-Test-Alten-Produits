import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDialog from './components/ProductDialog';
import { Box, Typography, Switch, FormControlLabel, AppBar, Toolbar, CircularProgress } from '@mui/material';
import type { Product } from './types/index';
import useProducts from './hooks/useProducts';

function App() {
  // Utilisez le hook pour obtenir les données et les fonctions d'interaction avec l'API
  const { products, loading, error, saveProduct, deleteProduct } = useProducts();

  const [isAdmin, setIsAdmin] = useState(false); // État pour simuler le rôle admin
  
  // États pour gérer l'ouverture/fermeture du dialogue d'ajout/édition
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined); // Produit à éditer (undefined pour ajout)

  // Fonctions pour gérer l'ouverture/fermeture du dialogue
  const handleOpenAddDialog = () => {
    setSelectedProduct(undefined); // Pour un nouvel ajout, pas de produit sélectionné
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product); // Pour l'édition, définissez le produit à modifier
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(undefined); // Réinitialiser après fermeture
  };

  // Fonction appelée par ProductDialog lors de la sauvegarde (ajout ou modification)
  // Elle utilise la fonction `saveProduct` fournie par le hook `useProducts`
  const handleSaveAndCloseDialog = async (productToSave: Product) => {
    try {
      await saveProduct(productToSave); // Appelle la fonction de sauvegarde du hook (qui gère POST/PUT et rafraîchit)
      handleCloseDialog(); // Ferme le dialogue si la sauvegarde réussit
    } catch (err) {
      // L'erreur est déjà alertée par le hook, mais vous pouvez ajouter une logique spécifique ici si nécessaire
      console.error("Erreur lors de la sauvegarde via dialogue:", err);
      // Ne pas fermer le dialogue en cas d'erreur pour que l'utilisateur puisse corriger
    }
  };

  // Fonction pour simuler le changement de rôle admin
  const toggleAdminMode = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestion des Produits
          </Typography>
          <FormControlLabel
            control={<Switch checked={isAdmin} onChange={toggleAdminMode} color="default" />}
            label="Mode Admin"
            sx={{ color: 'white' }}
          />
        </Toolbar>
      </AppBar>

      {/* Affichage du chargement, des erreurs ou de la liste des produits */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography ml={2}>Chargement des produits...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <ProductList
          products={products}
          isAdmin={isAdmin}
          onDeleteProduct={deleteProduct}       // Passe la fonction de suppression du hook
          onAddProductClick={handleOpenAddDialog}   // Passe la fonction pour ouvrir le dialogue d'ajout
          onEditProductClick={handleOpenEditDialog} // Passe la fonction pour ouvrir le dialogue d'édition
        />
      )}

      {/* Le composant ProductDialog géré directement par App.tsx */}
      <ProductDialog
        open={isDialogOpen}             // Contrôle l'ouverture du dialogue
        product={selectedProduct}       // Passe le produit sélectionné (pour édition) ou undefined (pour ajout)
        onClose={handleCloseDialog}     // Fonction pour fermer le dialogue
        onSave={handleSaveAndCloseDialog} // Fonction pour sauvegarder le produit (qui appelle le hook)
      />
    </Box>
  );
}

export default App;