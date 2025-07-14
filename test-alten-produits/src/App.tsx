import  { useState } from 'react';
import ProductList from './components/ProductList';
import { initialProducts } from './data/products';
import type { Product } from './types';
import { Box, Typography, Switch, FormControlLabel, AppBar, Toolbar } from '@mui/material';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdmin, setIsAdmin] = useState(false); // État pour simuler le rôle admin

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

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
      <ProductList
        products={products}
        isAdmin={isAdmin}
        onUpdateProducts={handleUpdateProducts}
      />
    </Box>
  );
}

export default App;