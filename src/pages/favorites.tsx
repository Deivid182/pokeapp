import Container from '../components/container'
import PokeCard from '../components/poke-card'
import useFavorites from '../hooks/use-favorites'
//import { useNavigate } from 'react-router-dom'
import { SortBy } from '../types'
import { useMemo, useState } from 'react'

const Favorites = () => {

  const { state } = useFavorites()
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const sortedFavorites = useMemo(() => {
    if(sorting === SortBy.NONE) {
      return state.favorites
    }

    if(sorting === SortBy.NAME) {
      return [...state.favorites].sort((a, b) => a.name.localeCompare(b.name))
    }

    if(sorting === SortBy.TYPE) {
      return [...state.favorites].sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name))
    }

    return state.favorites

  }, [sorting, state.favorites])

  return (
    <Container>
      {state.favorites.length === 0 ? (
        <div className='min-h-[57vh]'>
          <p className='text-center text-gray-700 text-xl'>No favorites yet</p>
        </div>
      ) : (
        <div className='grid gap-8'>
          <div className='flex max-sm:w-[60%] max-sm:flex-col sm:items-center gap-4'>
            <button
              onClick={() => handleChangeSort(SortBy.NAME)}
              className='flex items-center justify-center bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white'
            >
              Sort by Name
            </button>
            <button
              onClick={() => handleChangeSort(SortBy.TYPE)}
              className='flex items-center justify-center bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white'
            >
              Sort by Type
            </button>
            <button
              onClick={() => handleChangeSort(SortBy.NONE)}
              className='flex items-center justify-center bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white'
            >
              Reset
            </button>
          </div>
          <div className='grid-pokedex '>
            {sortedFavorites.map((pokemon) => (
              <PokeCard 
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                image={pokemon.img}
                types={pokemon.types}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}

export default Favorites