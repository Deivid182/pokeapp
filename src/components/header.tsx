import { Link } from 'react-router-dom'
import logoPokeApp from '../assets/logo-poke-app.png'
import Container from './container'
import { HeartIcon } from './icons'

const Header = () => {
  return (
    <nav className='w-full fixed bg-red-500 z-20 shadow-sm'>
      <div className='border-b border-gray-200 py-4'>
        <Container>
          <div className='flex items-center justify-between'>
            <Link to='/' >
              <img src={logoPokeApp} alt="logo-poke-app" width={150} height={50} />
            </Link>

            <button className='flex items-center p-2 w-fit border-none'>
              <HeartIcon />
              <p className='ml-2 text-white font-bold'>Favorites</p>
            </button>
          </div>
        </Container>
      </div>
    </nav>
  )
}

export default Header