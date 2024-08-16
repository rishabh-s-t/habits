import React from 'react';
import { Pacifico } from 'next/font/google';
import Button from './Button';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  return (
    <div className='flex flex-col flex-1  justify-center items-center gap-4 '>
      <h3
        className={
          'text-4xl sm:text-5xl md:text-6xl sm:my-1 textGradient p-6 ' +
          pacifico.className
        }
      >
        Login
      </h3>
      <p>You're one step away!</p>
      <input
        placeholder='email'
        className='max-w-[400px] w-full mx-auto px-6 py-2 sm:py-3 duration-200 hover:border-secondary focus:border-secondary border border-solid border-primary rounded-full outline-none'
      />
      <input
        placeholder='password'
        className='max-w-[400px] w-full mx-auto px-6 py-2 sm:py-3 duration-200 hover:border-secondary focus:border-secondary border border-solid border-primary rounded-full outline-none'
      />
      <div className='max-w-[400px] w-full mx-auto '>
        <Button text='Submit' full dark />
      </div>
      <p className='text-center'>
        Don't have an account?{' '}
        <span className={'text-secondary font-bold ' + pacifico.className}>
          sign up
        </span>
      </p>
    </div>
  );
}
