export const HeartIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
      />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6 text-neutral-400'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
      />
    </svg>
  );
};

export const ArrowRightIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
      />
    </svg>
  );
};
