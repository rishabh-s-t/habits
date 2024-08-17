import {
  Dancing_Script,
  Gloria_Hallelujah,
  Pacifico,
  Inter,
  Open_Sans,
} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from './context/AuthContext';
import Head from './Head';
import Logout from './component/Logout';

const open = Open_Sans({ subsets: ['latin'] });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'Habits',
  description: 'A web app to track habits',
};

export default function RootLayout({ children }) {
  const header = (
    <header className='p-2 sm:p-4 flex items-center justify-between gap-4'>
      <Link href={'/'}>
        <h1
          className={
            'text-xl sm:text-2xl textGradient font-bold ' + pacifico.className
          }
        >
          habits
        </h1>
      </Link>
      <Logout />
    </header>
  );
  const footer = (
    <footer className='p-4 sm:p-8 grid place-items-center'>
      <p className={'textGradient py-1 ' + pacifico.className}>
        i hope you ✨like it✨ patrick
      </p>
    </footer>
  );
  return (
    <html lang='en'>
      <Head />
      <AuthProvider>
        <body
          className={
            'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ' +
            open.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
