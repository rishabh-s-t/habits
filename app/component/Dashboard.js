'use client';
import React, { useState, useEffect } from 'react';
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
import Calendar from './Calendar';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Loading from './Loading';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [journal, setJournal] = useState('');
  const [water, setWater] = useState(0);
  const [miles, setMiles] = useState(0);
  const [hours, setHours] = useState(0);
  const [kgs, setKgs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [selectedMood, setSelectedMood] = useState('');

  const [data, setData] = useState({});

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

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

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    return journalPrompts[randomIndex];
  };

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

  const handleTrackButton = () => {
    console.log('Button pressed');
    const data = {
      mood: selectedMood,
      journalEntry: journal,
      waterIntake: water,
      milesRan: miles,
      studyHours: hours,
      weightInKgs: kgs,
      proteinIntake: protein,
      carbsIntake: carbs,
      fatsIntake: fats,
      date: new Date().toISOString(), // For time reference
    };

    setData(data);
  };

  function countValues() {}

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      // update the current state
      setData(newData);
      // update the global state
      setUserDataObj(newData);
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log('Failed to set data: ', err.message);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

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

          {/* Mood Section */}
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
                      key={moodIndex}
                      className={
                        'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 ' +
                        (selectedMood === mood
                          ? 'ring-4 ring-indigo-400' // Highlight selected mood
                          : '')
                      }
                      onClick={() => setSelectedMood(mood)} // Update selected mood on click
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

          {/* Journal Section */}
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
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder='Journal here...'
                  className='w-full h-full p-3 outline-none border-2 border-indigo-100 rounded-xl resize-none duration-200 hover:border-secondary focus:border-secondary'
                />
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center mx-1 my-1'>
            <Activity
              name='Water intake'
              placeholder='enter glasses'
              icon={Glass}
              value={water}
              onChange={setWater} // Bind to state
            />
          </div>
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center'>
            <Activity
              name='Miles ran?'
              placeholder='enter miles'
              icon={Running}
              value={miles}
              onChange={setMiles} // Bind to state
            />
          </div>
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center'>
            <Activity
              name='Study (upskill)'
              placeholder='enter hours'
              icon={Study}
              value={hours}
              onChange={setHours} // Bind to state
            />
          </div>
          <div className='col-span-3 row-span-1 rounded-3xl flex justify-center items-center'>
            <Activity
              name='Weight in kgs'
              placeholder='in kgs'
              icon={Weight}
              value={kgs}
              onChange={setKgs} // Bind to state
            />
          </div>
          <div className='col-span-6 row-span-2  rounded-3xl flex justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-1'>
              <div className='mx-2 col-span-1 row-span-1 rounded-3xl justify-center items-center'>
                <Activity
                  name='Protein'
                  placeholder='in gms'
                  icon={Protein}
                  value={protein}
                  onChange={setProtein} // Bind to state
                />
              </div>
              <div className='mx-2 col-span-1 row-span-1 rounded-3xl justify-center items-center'>
                <Activity
                  name='Carbs'
                  placeholder='in gms'
                  icon={Carbs}
                  value={carbs}
                  onChange={setCarbs} // Bind to state
                />
              </div>
              <div className='mx-2 col-span-1 row-span-1 rounded-3xl justify-center items-center'>
                <Activity
                  name='Fats'
                  placeholder='in gms'
                  icon={Fats}
                  value={fats}
                  onChange={setFats} // Bind to state
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full items center justify-center my-4 p-2 sm:p-3'>
        <div className='max-w-[400px] w-full mx-auto align-bottom'>
          <Button text='track' dark full onPress={handleTrackButton} />
        </div>
      </div>

      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
