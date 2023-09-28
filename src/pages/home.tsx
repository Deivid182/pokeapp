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

  useEffect(() => {
    const getPokemons = async () => {
      const baseUrl = 'https://pokeapi.co/api/v2';
      try {
        setIsLoading(true);
        const { data } = await axios(`${baseUrl}/pokemon`);

        const promises = data.results.map(async (pokemon: PokemonSingle) => {
          const { data } = await axios(pokemon.url);
          return data;
        });

        const results = await Promise.all(promises);
        setAllPokemons(results);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getPokemons();
  }, []);

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
        {isLoading && (
          <p className='text-center text-gray-700 text-xl'>Loading...</p>
        )}
        <div className='grid-pokedex '>
          {filteredPokemons.map((pokemon: Pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
