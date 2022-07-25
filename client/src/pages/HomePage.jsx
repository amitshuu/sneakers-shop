import React, { useState } from 'react';
import { About, Header, MoblieMenu, Navbar, TopPicks } from '../components';

const HomePage = () => {
  return (
    <main className='section-center'>
      <Navbar />
      <Header />
      <TopPicks />
      <About />
    </main>
  );
};

export default HomePage;
