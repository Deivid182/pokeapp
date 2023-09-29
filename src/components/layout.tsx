import Container from './container'
import Footer from './footer'
import Header from './header'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className='pt-20 pb-6'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default RootLayout