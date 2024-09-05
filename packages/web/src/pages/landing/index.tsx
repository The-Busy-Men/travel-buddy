// App.js
import React from 'react';
import Hero from './components/hero';
import FeaturedDestinations from './components/featuredDestinations';
import './components/index.css';

function Landing() {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
    </div>
  );
}

export default Landing;
