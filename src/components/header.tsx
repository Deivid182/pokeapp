import { Link } from 'react-router-dom'
import logoPokeApp from '../assets/logo-poke-app.png'
import Container from './container'
import { HeartIcon } from './icons'
import FavoritesSidebar from './favorites-sidebar'
import { useState } from 'react'

const Header = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <FavoritesSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <nav className='w-full fixed bg-red-500 z-20 shadow-sm'>
        <div className='border-b border-gray-200 py-1'>
          <Container>
            <div className='flex items-center justify-between'>
              <Link to='/' >
                <img src={logoPokeApp} alt="logo-poke-app" width={150} height={50} />
              </Link>

              <button 
                className='flex items-center p-2 w-fit border-none'
                onClick={() => setIsOpen(true)}
              >
                <HeartIcon className='text-white'/>
                <p className='ml-2 text-white font-bold'>Favorites</p>
              </button>
            </div>
          </Container>
        </div>
      </nav>
    </>
  )
}

export default Header