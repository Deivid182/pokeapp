import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png';

interface PokeEvo {
  name: string;
  img: string;
}

const PokemonPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokeEvoArray, setPokeEvoArray] = useState<PokeEvo[]>([]);
  const { id } = useParams();

  const getPokemonImgs = async (pokeName: string) => {
    try {
      const { data } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}/`
      );

      return data.sprites.other.home.front_default;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setIsLoading(true);
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const evolutionsUrl = await axios(res.data.species.url);
        const { data } = await axios(evolutionsUrl.data.evolution_chain.url);
        console.log(data)
        const pokeArray = []

        const pokemonLv1 = data.chain.species.name;
        const pokemonLv1Img = await getPokemonImgs(pokemonLv1);


        pokeArray.push({ name: pokemonLv1, img: pokemonLv1Img });

        if (data.chain.evolves_to.length !== 0) {
          const pokemonLv2 = data.chain.evolves_to[0].species.name;
          const pokemonLv2Img = await getPokemonImgs(pokemonLv2);

          pokeArray.push({ name: pokemonLv2, img: pokemonLv2Img });

          if (data.chain.evolves_to[0].evolves_to.length > 0) {
            const pokemonLv3 =
              data.chain.evolves_to[0].evolves_to[0].species.name;
            const pokemonLv3Img = await getPokemonImgs(pokemonLv3);

            pokeArray.push({ name: pokemonLv3, img: pokemonLv3Img });

            setPokeEvoArray(pokeArray);
          }
        }

      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    };
    setPokeEvoArray([]);
    getPokemon();
  }, [id]);

  return isLoading ? (
    <p className='text-center text-gray-700 text-xl'>Loading...</p>
  ) : (
    <div className='flex flex-col gap-4'>
      <h3 className='py-4 relative text-center text-2xl font-semibold text-gray-900 uppercase'>
        <hr className='absolute w-full border border-neutral-500' />
        {pokeEvoArray.length > 0 && <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gray-100 px-2 py-1'>{pokeEvoArray[0].name}</span>}
      </h3>
      <div className='relative flex-1 w-full max-w-sm mx-auto bg-sky-600 rounded-lg flex items-center justify-center'>
        <img
          src={pokeEvoArray.length > 0 ? pokeEvoArray[0].img : placeholder}
          alt='pokemon'
          className='object-contain'
        />
      </div>
      {pokeEvoArray.length > 0 ? (
        <>
          <p className='text-center text-xl font-semibold text-gray-700 uppercase'>
            Evolutions
          </p>
          <div className='flex max-lg:flex-col flex-row gap-3'>
            {pokeEvoArray.map((evo, index) => (
              <div
                className='flex-1 relative w-full p-2 bg-gray-100 rounded-lg'
                key={index}
              >
                <div className='bg-sky-200 rounded-lg'>
                  <img
                    src={evo.img}
                    alt={evo.name}
                    className='object-contain w-full h-full rounded-lg'
                  />
                </div>
                <p className='text-center pt-2 text-xl uppercase font-semibold text-neutral-700'>{evo.name}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className='text-center text-xl font-semibold text-gray-700 uppercase'>
          There's no evolutions for this pokemon
        </p>
      )}
    </div>
  );
};

export default PokemonPage;
