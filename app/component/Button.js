import { Pacifico } from 'next/font/google';
import React from 'react';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Button(props) {
  const { text, dark, full } = props;
  return (
    <button
      className={
        ' overflow-hidden duration-200 hover:opacity-60 rounded-full ' +
        (dark
          ? ' text-black buttonGradient '
          : ' text-primary border-2 border-primary ') +
        (full ? 'grid place-items-center w-full ' : ' ') +
        pacifico.className
      }
    >
      <p
        className={
          'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3' + pacifico.className
        }
      >
        {text}
      </p>
    </button>
  );
}
