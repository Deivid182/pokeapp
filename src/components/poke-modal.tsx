import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { CloseIcon } from './icons';
import placeholder from '../assets/placeholder.png';

interface PokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
}

interface PokeEvo {
  name: string;
  img: string;
}

const PokeModal: React.FC<PokeModalProps> = ({ isOpen, onClose, id }) => {
  const [pokeEvoArray, setPokeEvoArray] = useState<PokeEvo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemonImgs = async (pokeName: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      return data.sprites.other.home.front_default;
    } catch (error) {
      console.log(error);
    }
  };
  const getEvolutions = async (id: number) => {
    try {
      setIsLoading(true);
      console.log(id)
      const res = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${id}/`
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      const pokemonLv1 = data.chain.species.name;
      const pokemonLv1Img = await getPokemonImgs(pokemonLv1);

      setPokeEvoArray([{ name: pokemonLv1, img: pokemonLv1Img }]);

      if (data.chain.evolves_to.length > 0) {
        const pokemonLv2 = data.chain.evolves_to[0].species.name;
        const pokemonLv2Img = await getPokemonImgs(pokemonLv2);

        setPokeEvoArray((prev) => [
          ...prev,
          { name: pokemonLv2, img: pokemonLv2Img },
        ]);
        if (data.chain.evolves_to[0].evolves_to.length > 0) {
          const pokemonLv3 =
            data.chain.evolves_to[0].evolves_to[0].species.name;
          const pokemonLv3Img = await getPokemonImgs(pokemonLv3);

          setPokeEvoArray((prev) => [
            ...prev,
            { name: pokemonLv3, img: pokemonLv3Img },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !id) return;
    getEvolutions(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='relative
                w-full
                max-w-2xl
                max-h-[90vh]
                p-6
                text-left
                overflow-y-auto
                transform
                rounded-xl
                bg-white
                shadow-xl
                transition-all
                flex flex-col
                gap-6'
              >
                <button
                  type='button'
                  onClick={() => {
                    onClose();
                    setPokeEvoArray([]);
                  }}
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-white rounded-full'
                >
                  <CloseIcon />
                </button>
                {isLoading ? (
                  <p className='text-center text-gray-700 text-xl'>Loading...</p>
                ) : (
                  <div className='flex-1 flex flex-col gap-4'>
                    <div className='relative flex-1 w-full max-w-sm mx-auto bg-sky-600 rounded-lg flex items-center justify-center'>
                      <img
                        src={pokeEvoArray.length > 0 ? pokeEvoArray[0].img : placeholder}
                        alt='pokemon'
                        className='object-contain'
                      />
                    </div>
                    <p className='text-center text-xl font-semibold text-gray-700'>
                      Evolutions
                    </p>
                    <div className='flex gap-3'>
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
                          <p className='text-center pt-2'>{evo.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PokeModal;
