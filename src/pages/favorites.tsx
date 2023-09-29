import Container from '../components/container'
import PokeCard from '../components/poke-card'
import useFavorites from '../hooks/use-favorites'
import { useNavigate } from 'react-router-dom'
import { SortBy } from '../types'
import { useMemo, useState } from 'react'

const Favorites = () => {

  const { dispatch, reducerActions, state } = useFavorites()
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const navigate = useNavigate()

  const toggleSortBy = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.NAME : SortBy.NONE
    setSorting(newSortingValue)
  }

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
          <div className='flex items-center gap-4'>
            <button
              onClick={() => toggleSortBy()}
              className='flex items-center justify-center bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white'
            >
              Sort by Name
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