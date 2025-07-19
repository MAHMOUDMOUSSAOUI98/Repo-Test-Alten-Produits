// src/hooks/useProducts.ts
import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/index';

const API_BASE_URL = "http://localhost:8080/api/products";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  saveProduct: (productToSave: Product) => Promise<void>;
  deleteProduct: (id?: string) => Promise<void>;
}

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer tous les produits (GET)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error("Erreur lors de la récupération des produits:", err);
      setError(`Impossible de charger les produits: ${err.message}. Veuillez vérifier que le backend tourne.`);
    } finally {
      setLoading(false);
    }
  }, []); // Aucune dépendance, car elle ne dépend de rien qui change

  // Fonction pour sauvegarder un produit (POST ou PUT)
  const saveProduct = useCallback(async (productToSave: Product) => {
    try {
      let response;
      if (productToSave.id) { // Si le produit a un ID, c'est une mise à jour (PUT)
        response = await fetch(`${API_BASE_URL}/${productToSave.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productToSave),
        });
      } else { // Sinon, c'est un nouvel ajout (POST)
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productToSave),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur HTTP! Statut: ${response.status}, Détails: ${JSON.stringify(errorData)}`);
      }

      await fetchProducts(); // Rafraîchir la liste après sauvegarde
      alert('Produit sauvegardé avec succès !');

    } catch (err: any) {
      console.error("Erreur lors de la sauvegarde du produit:", err);
      alert(`Erreur lors de la sauvegarde: ${err.message}`);
      throw err; // Propage l'erreur
    }
  }, [fetchProducts]); // Dépend de fetchProducts

  // Fonction pour supprimer un produit (DELETE)
  const deleteProduct = useCallback(async (id?: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}. Impossible de supprimer le produit.`);
        }

        await fetchProducts(); // Rafraîchir la liste après suppression
        alert('Produit supprimé avec succès !');

      } catch (err: any) {
        console.error("Erreur lors de la suppression du produit:", err);
        alert(`Erreur lors de la suppression: ${err.message}`);
      }
    }
  }, [fetchProducts]); // Dépend de fetchProducts

  // Charger les produits au montage du hook (et donc du composant qui l'utilise)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Dépend de fetchProducts (important pour le useCallback)

  return {
    products,
    loading,
    error,
    fetchProducts, // Peut être exposé si d'autres parties veulent forcer un rechargement
    saveProduct,
    deleteProduct,
  };
};

export default useProducts;