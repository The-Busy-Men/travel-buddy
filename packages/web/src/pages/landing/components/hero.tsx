import React from 'react';
import './hero.css';
import { useAlert } from '../../../api/providers/alertContext';

const Hero = () => {
  const {showAlert} = useAlert();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Next Adventure Awaits</h1>
        <p>Discover curated travel experiences tailored just for you.</p>
        <div className="search-bar">
          <input type="text" placeholder="Where do you want to go?" />
          <input type="date" />
          <button className="btn-primary" onClick={() => showAlert('Test Alert 2', 'success')}>Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
