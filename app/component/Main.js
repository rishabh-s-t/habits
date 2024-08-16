import React from 'react';

export default function Main(props) {
  const { children } = props;
  return <main className='flex-1 flex flex-col p-1 sm:p-2'>{children}</main>;
}
