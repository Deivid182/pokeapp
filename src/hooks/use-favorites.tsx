import { useContext } from 'react';
import { FavoritesContext, useFavoritesContextType } from '../context/favorites-provider';

const useFavorites = (): useFavoritesContextType => {
  return useContext(FavoritesContext);
}

export default useFavorites