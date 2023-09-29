import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import RootLayout from './components/layout'
import Home from './pages/home'
import PokemonPage from './pages/pokemon-page'
import { FavoritesProvider } from './context/favorites-provider'
import Favorites from './pages/favorites'

const App = () => {

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='pokemon/:id' element={<PokemonPage />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App