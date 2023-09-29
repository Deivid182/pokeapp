import { createContext, useMemo, useReducer } from 'react';
import { PokemonItem } from '../types';

type FavoritesState = {
  favorites: PokemonItem[];
}

const initialState: FavoritesState = {
  favorites: [],
}

const reducerActionTypes = {
  addFavorite: 'add-favorite',
  removeFavorite: 'remove-favorite',
}

export type reducerActionType = typeof reducerActionTypes

export type reducerFavoritesAction = {
  type: string;
  payload?: PokemonItem;
}

const reducer = (state: FavoritesState, action: reducerFavoritesAction): FavoritesState => {
  switch(action.type) {
    case reducerActionTypes.addFavorite: {

      if(!action.payload) {
        throw new Error('Payload not found');
      }

      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    }
    case reducerActionTypes.removeFavorite: {
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload?.id)
      }
    }
    default: {
      return state;
    }
  }
}

const useFavoritesContext = (initialState: FavoritesState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reducerActions = useMemo(() => {
    return reducerActionTypes
  }, [])

  return {
    state,
    dispatch,
    reducerActions
  }
}

export type useFavoritesContextType = ReturnType<typeof useFavoritesContext>

const initialFavoritesContext: useFavoritesContextType = {
  state: initialState,
  dispatch: () => {},
  reducerActions: reducerActionTypes
}

export const FavoritesContext = createContext<useFavoritesContextType>(initialFavoritesContext);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <FavoritesContext.Provider value={useFavoritesContext(initialState)}>
      {children}
    </FavoritesContext.Provider>
  )
}