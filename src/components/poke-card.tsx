import { useNavigate } from 'react-router-dom';
import useFavorites from '../hooks/use-favorites';
import { HeartIcon } from './icons';
import { AbilityElement, TypeElement } from '../types';
import { PokemonType, getColorByType } from '../constants';

interface PokeCardProps {
  name: string
  id: number
  image: string
  abilities?: AbilityElement[] 
  types: TypeElement[]
}

const PokeCard: React.FC<PokeCardProps> = ({ name, id, image, abilities, types }) => {

  const navigate = useNavigate()
  const { dispatch, reducerActions, state } = useFavorites()

  const isFavorite = state.favorites.some((item) => item.id === id)

  const borderColor = getColorByType(types[0].type.name as PokemonType)

  return (
    <>
      <article className={`bg-white rounded-lg shadow`} style={{ borderColor, borderWidth: '4px' }}>
        <h5 className='text-2xl pt-4 font-semibold text-center tracking-tight text-gray-900 uppecase'>
          {name}
        </h5>
        <div className={`h-[150px]`} style={{ background: `linear-gradient(180deg, ${borderColor} 0%, transparent 100%)` }}>
          <img
            className='hover:scale-105 w-full h-full duration-150 object-contain cursor-default'
            src={image}
            alt={'pokemon'}
          />
        </div>
        <div className='space-y-3 p-2'>
          <p className='text-xl font-semibold tracking-tight text-gray-900 uppecase'>
            Id: <span className='text-gray-600 font-normal'>{id}</span>
          </p>

          {abilities && (
            <p className='text-xl font-semibold tracking-tight text-gray-900 uppecase'>
              Abilities:{' '}
              <span className='text-gray-600 font-normal'>
                {abilities
                  .map((ability) => ability.ability.name)
                  .join(', ')}
              </span>
            </p>
          )}
          <div className='flex items-center justify-between'>
            <button
              onClick={() => {
                navigate(`/pokemon/${id}`);
              }}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Learn more
              <svg
                className='w-3.5 h-3.5 ml-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </button>
            <button
              className='flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-neutral-200 focus:ring-4 focus:outline-none'
              onClick={() => {
                dispatch({
                  type: isFavorite ? reducerActions.removeFavorite : reducerActions.addFavorite,
                  payload: {
                    id,
                    name,
                    img: image,
                    types
                  },
                });
              }}
            >
              <HeartIcon className={isFavorite ? 'fill-red-500' : 'text-red-500'}/>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default PokeCard;
