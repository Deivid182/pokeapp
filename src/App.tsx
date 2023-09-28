import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import RootLayout from './components/layout'
import Home from './pages/home'
import PokemonPage from './pages/pokemon-page'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='pokemon/:id' element={<PokemonPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App