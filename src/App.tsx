import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import RootLayout from './components/layout'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<h1>Home</h1>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App