'use client';
import React, { useState, useEffect } from 'react';
import Main from './Main';
import { Pacifico } from 'next/font/google';
import Button from './Button';
import Activity from './Activity';
import Glass from './icons/Glass';
import Running from './icons/Running';
import Study from './icons/Study';
import Weight from './icons/Weight';
import Protein from './icons/Protein';
import Carbs from './icons/Carbs';
import Fats from './icons/Fats';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    return journalPrompts[randomIndex];
  };

  useEffect(() => {
    const prompt = getRandomPrompt();
    setPrompt(prompt);
  }, []);

  const journalPrompts = [
    'What am I grateful for?',
    'What did I learn today?',
    'How do I feel now?',
    'What is my challenge today?',
    'What made me smile?',
    'What brings me peace?',
    'What is my focus today?',
    'What can I improve?',
    'What do I appreciate?',
    'What is my next step?',
  ];

  const moods = {
    '&*@#$': '😭',
    Sad: '🥲',
    Existing: '😶',
    Good: '😊',
    Elated: '😍',
  };

  const statues = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: new Date().toDateString(),
  };

  return (
    <div className='flex flex-col p-2'>
      <div className='flex w-full h-full items-center justify-center border-b-2 border-indigo-100'>
        <div className=' grid h-full w-full grid-cols-12 grid-rows-6 gap-4'>
          <div className='col-span-12 row-span-1  rounded-3xl flex justify-center items-center'>
            <div className='flex flex-row w-full h-full items-center justify-center p-2 sm:p-4'>
              <div className='grid grid-cols-3 grid-rows-1 px-8 py-4 bg-indigo-100 rounded-xl'>
                {Object.keys(statues).map((status, statusIndex) => {
                  return (
                    <div
                      key={statusIndex}
                      className=' flex flex-col gap-1 sm:gap-2 '
                    >
                      <p className='font-medium capitalize text-sm sm:text-md truncate'>
                        {status.replaceAll('_', ' ')}
                      </p>
                      <p
                        className={
                          'text-xl sm:text-2xl truncate pb-2 ' +
                          pacifico.className
                        }
                      >
                        {statues[status]}
                        {status === 'num_days' ? ' 🔥' : ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='col-span-12 row-span-2 rounded-3xl flex'>
            <div className='w-full h-full items-center justify-center content-center p-2 sm:p-4 border-y-2 border-indigo-100'>
              <h4
                className={
                  'text-xl sm:text-3xl md:text-2xl text-center pb-6 ' +
                  pacifico.className
                }
              >
                How do you <span className='textGradient px-1 '>feel</span>{' '}
                today?
              </h4>
              <div className='flex items-stretch flex-wrap gap-4'>
                {Object.keys(moods).map((mood, moodIndex) => {
                  return (
                    <button
                      className={
                        'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '
                      }
                      key={moodIndex}
                    >
                      <p className='text-4xl sm:text-5xl md:text-6xl'>
                        {moods[mood]}
                      </p>
                      <p
                        className={
                          'text-indigo-500 text-xs sm:text-sm md:text-base ' +
                          pacifico.className
                        }
                      >
                        {mood}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='col-span-6 row-span-4 rounded-3xl flex justify-center items-center'>
            <div className='w-full h-full flex flex-col items-center justify-center content-center p-2 sm:p-4'>
              <h4
                className={
                  'text-xl sm:text-3xl md:text-2xl text-center pb-6 ' +
                  pacifico.className
                }
              >
                {prompt}
              </h4>
              <div className='w-full h-full flex'>
                <textarea
                  placeholder='Journal here...'
                  className='w-full h-full p-3 outline-none border-2 border-indigo-100 rounded-xl resize-none duration-200 hover:border-secondary focus:border-secondary'
                />
              </div>
            </div>
          </div>

          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center mx-1 my-1'>
            <Activity
              name='Water intake'
              placeholder='enter glasses'
              icon={Glass}
            />
          </div>
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center'>
            <Activity
              name='Miles ran?'
              placeholder='enter miles'
              icon={Running}
            />
          </div>
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center'>
            <Activity
              name='Study (upskill)'
              placeholder='enter hours'
              icon={Study}
            />
          </div>
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center'>
            <Activity name='Weight in kgs' placeholder='in kgs' icon={Weight} />
          </div>
          <div className='col-span-6 row-span-2  rounded-3xl flex justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-1'>
              <div className='mx-2 col-span-1 row-span-1 rounded-3xl justify-center items-center'>
                <Activity name='Protein' placeholder='in gms' icon={Protein} />
              </div>
              <div className='mx-2 col-span-1 row-span-1 rounded-3xl justify-center items-center'>
                <Activity name='Carbs' placeholder='in gms' icon={Carbs} />
              </div>
              <div className='mx-2 col-span-1 row-span-1 rounded-3xl justify-center items-center'>
                <Activity name='Fats' placeholder='in gms' icon={Fats} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full items center justify-center my-4 p-2 sm:p-3'>
        <div className='max-w-[400px] w-full mx-auto align-bottom'>
          <Button text='track' dark full />
        </div>
      </div>
    </div>
  );
}
