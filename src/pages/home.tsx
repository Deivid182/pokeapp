import { useEffect, useMemo, useState } from 'react';
import { Pokemon, PokemonSingle } from '../types';
import PokeCard from '../components/poke-card';
import Container from '../components/container';
import axios, { AxiosError } from 'axios';
import Input from '../components/input';

const Home = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const getPokemons = async () => {
      const baseUrl = 'https://pokeapi.co/api/v2';
      try {
        setIsLoading(true);
        const { data } = await axios(`${baseUrl}/pokemon?limit=20&offset=${offset}`);

        const promises = data.results.map(async (pokemon: PokemonSingle) => {
          const { data } = await axios(pokemon.url);
          return data;
        });

        const results = await Promise.all(promises);

        const pokemonArray = structuredClone(allPokemons);

        setAllPokemons(pokemonArray.concat(results));

      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const filteredPokemons = useMemo(() => {
    return query != null && query.length > 0
      ? allPokemons.filter(
        (pokemon) =>
          pokemon.name.toLocaleLowerCase().includes(query) ||
          pokemon.id === parseInt(query)
      )
      : allPokemons;
  }, [allPokemons, query]);

  return (
    <>
      <Container>
        <div className='max-w-lg py-4'>
          <Input
            searchText={query}
            handleSearchChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {allPokemons.length > 0 && (
          <div className='grid-pokedex '>
            {filteredPokemons.map((pokemon: Pokemon) => (
              <PokeCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other['home'].front_default}
                types={pokemon.types}
                abilities={pokemon.abilities}
              />
            ))}
          </div>
        )}
        {isLoading && (
          <div className='flex justify-center py-4'>
            Loading...
          </div>
        )}

        {!isLoading && (
          <div className='flex justify-center pt-4'>
            <button
              aria-label='Load More'
              onClick={() => setOffset(offset + 20)}
              className='flex justify-center bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white'
            >
              Load More
            </button>
          </div>
        )}

      </Container>
    </>
  );
};

export default Home;
