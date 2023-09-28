import { Pokemon } from '../types';
import { useNavigate } from 'react-router-dom';
interface PokeCardProps {
  pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {

  const navigate = useNavigate()

  return (
    <>
      <article className='bg-white border border-gray-200 rounded-lg shadow'>
        <h5 className='text-2xl pt-4 font-semibold text-center tracking-tight text-gray-900 uppecase'>
          {pokemon.name}
        </h5>
        <a href='#'>
          <img
            className='hover:scale-105 w-full duration-150 cursor-default'
            src={pokemon.sprites.other.home.front_default}
            alt={'pokemon'}
          />
        </a>
        <div className='p-5 space-y-3'>
          <p className='text-xl font-semibold tracking-tight text-gray-900 uppecase'>
            Id: <span className='text-gray-600 font-normal'>{pokemon.id}</span>
          </p>

          <p className='text-xl font-semibold tracking-tight text-gray-900 uppecase'>
            Abilities:{' '}
            <span className='text-gray-600 font-normal'>
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(', ')}
            </span>
          </p>
          <button
            onClick={() => {
              navigate(`/pokemon/${pokemon.id}`);
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
        </div>
      </article>
    </>
  );
};

export default PokeCard;
