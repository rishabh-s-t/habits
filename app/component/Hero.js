import {
  Alice,
  Gloria_Hallelujah,
  Open_Sans,
  Pacifico,
  Sacramento,
} from 'next/font/google';
import React from 'react';
import Button from './Button';
import Calendar from './Calendar';

const open = Open_Sans({ subsets: ['latin'], weight: ['400'] });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8 '>
      <h1
        className={
          'text-5xl sm:text-6xl md:text-7xl text-center text-slate-700 ' +
          open.className
        }
      >
        <span className={'textGradient ' + pacifico.className}>habits</span>{' '}
        helps you track your{' '}
        <span className={'textGradient ' + pacifico.className}>daily</span>{' '}
        habits.
      </h1>

      <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]'>
        Track your habits and see your journey of
        <br />
        <span className='textGradient font-extrabold'>
          self improvement
        </span>{' '}
        everyday.
      </p>

      <div className={'grid grid-cols-2 gap-4 w-fit mx-auto '}>
        <Button text='Sign Up' />
        <Button text='Login' dark />
      </div>

      <Calendar />
    </div>
  );
}
