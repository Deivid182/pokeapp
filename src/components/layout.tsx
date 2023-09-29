import Container from './container'
import Header from './header'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className='py-20'>
        <Container>
          <Outlet />
        </Container>
      </main>

    </>
  )
}

export default RootLayout