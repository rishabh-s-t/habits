'use client';
import React, { useState } from 'react';
import { Pacifico } from 'next/font/google';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const { signup, login } = useAuth();
  const [authenticating, setAuthenticating] = useState(false);

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegistered) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className='flex flex-col flex-1  justify-center items-center gap-4 '>
      <h3
        className={
          'text-4xl sm:text-5xl md:text-6xl sm:my-1 textGradient p-6 ' +
          pacifico.className
        }
      >
        {isRegistered ? 'Register' : 'Login'}
      </h3>
      <p>{"You're one step away!"}</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder='email'
        className='max-w-[400px] w-full mx-auto px-6 py-2 sm:py-3 duration-200 hover:border-secondary focus:border-secondary border border-solid border-primary rounded-full outline-none'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder='password'
        className='max-w-[400px] w-full mx-auto px-6 py-2 sm:py-3 duration-200 hover:border-secondary focus:border-secondary border border-solid border-primary rounded-full outline-none'
      />
      <div className='max-w-[400px] w-full mx-auto '>
        <Button
          onPress={handleSubmit}
          text={authenticating ? 'Submitting...' : 'Submit'}
          full
          dark
        />
      </div>
      <p className='text-center'>
        {isRegistered ? 'Already have an account? ' : "Don't have an account? "}
        <button
          onClick={() => setIsRegistered(!isRegistered)}
          className={'text-secondary font-bold ' + pacifico.className}
        >
          {isRegistered ? 'sign in' : 'sign Up'}
        </button>
      </p>
    </div>
  );
}
