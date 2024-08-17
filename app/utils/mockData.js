import { format, subDays } from 'date-fns';

// Helper function to generate random integer between min and max
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random date in the past
const getRandomDate = (daysBack) =>
  subDays(new Date(), getRandomInt(0, daysBack));

export function mockFetchData(demo) {
  if (!demo) return Promise.resolve([]);

  // Define the range of dates for the demo
  const numDays = 30; // Number of days to generate data for
  const dates = Array.from({ length: numDays }, (_, index) =>
    getRandomDate(index)
  );

  // Generate mock data for each date
  const mockData = dates.map((date) => {
    return {
      date: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      mood: ['Sad', 'Existing', 'Good', 'Elated'][getRandomInt(0, 3)],
      journal: 'Sample journal entry...',
      waterIntake: getRandomInt(0, 10),
      milesRan: getRandomInt(0, 5),
      studyHours: getRandomInt(0, 8),
      weightInKgs: getRandomInt(50, 100),
      proteinIntake: getRandomInt(50, 200),
      carbsIntake: getRandomInt(100, 300),
      fatsIntake: getRandomInt(20, 100),
    };
  });

  return Promise.resolve(mockData);
}
