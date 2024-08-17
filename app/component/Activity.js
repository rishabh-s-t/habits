import React from 'react';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Activity({
  icon: Icon,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center justify-center sm:py-2'>
        <Icon className='max-w-[32px] max-h-[32px]' />
        <p className={'mt-2 text-lg ' + pacifico.className}>{name}</p>
      </div>
      <div className='flex flex-col items-center justify-center content-center mt-1 w-full'>
        <input
          type='number'
          placeholder={placeholder}
          value={value} // Bind value to the state
          onChange={(e) => onChange(Number(e.target.value))} // Call onChange with the new value
          className='rounded-full p-1 outline-none border-2 border-indigo-100 resize-none text-center duration-200 hover:border-secondary focus:border-secondary w-full max-w-[150px]'
        />
      </div>
    </div>
  );
}
