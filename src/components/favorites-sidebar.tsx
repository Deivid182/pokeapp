import { Dialog, Transition } from '@headlessui/react';
import useFavorites from '../hooks/use-favorites';
import { ArrowRightIcon, CloseIcon, HeartIcon } from './icons';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesSidebar: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { dispatch, reducerActions, state } = useFavorites();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' onClose={onClose} className={'relative z-50'}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-20' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-sm:max-w-xs max-w-xs'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl py-6 px-4 sm:px-6'>
                    <div className='flex items-center justify-end h-12'>
                      <button
                        aria-label='Close panel'
                        type='button'
                        onClick={onClose}
                        className='rounded-md 
                            bg-white 
                            flex 
                            items-center 
                            justify-center 
                            text-slate-gray 
                            hover:text-coral-red 
                            hover:focus:outline-none'
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className='relative flex-1 mt-6 px-4 sm:px-6 space-y-4'>
                      <div className='flex justify-end'>
                        <Link
                          to={'/favorites'}
                          onClick={onClose}
                          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg '
                        >
                          Go to favorites
                          <ArrowRightIcon />
                        </Link>
                      </div>
                      <ul className='flex flex-col gap-y-4 items-center'>
                        {state.favorites.map((pokemon) => (
                          <div
                            key={pokemon.id}
                            className='max-w-[200px] bg-white border-gray border rounded-lg shadow-sm p-2'
                          >
                            <img
                              src={pokemon.img}
                              alt={pokemon.name}
                              className='w-full rounded-t-lg'
                            />
                            <p className='text-xl font-semibold text-center'>
                              {pokemon.name}
                            </p>
                            <div className='flex justify-end '>
                              <button
                                aria-label='Remove from favorites'
                                className='flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-neutral-200 focus:ring-4 focus:outline-none'
                                onClick={() => {
                                  dispatch({
                                    type: reducerActions.removeFavorite,
                                    payload: pokemon
                                  })
                                }}
                              >
                                <HeartIcon className={'text-red-500 fill-red-500'} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FavoritesSidebar;
