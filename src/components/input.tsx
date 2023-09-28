import { SearchIcon } from './icons';

interface InputProps {
  searchText?: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ handleSearchChange, searchText }) => {
  return (
    <div className='cols md:col-span-3'>
      <div className='flex flex-row items-center border-none rounded-lg shadow-md px-4 py-2 bg-white'>
        <SearchIcon />
        <input
          value={searchText}
          onChange={handleSearchChange}
          type="text"
          placeholder='Search by name or number'
          className='flex-grow m-2 border-none w-full outine-none focus:outline-none'
        />
      </div>
    </div>
  )
}

export default Input