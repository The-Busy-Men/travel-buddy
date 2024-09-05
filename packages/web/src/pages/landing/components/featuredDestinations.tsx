import React from 'react';
import './featuredDestinations.css';

const destinations = [
  { name: 'Bali', image: 'https://source.unsplash.com/400x300/?bali' },
  { name: 'Paris', image: 'https://source.unsplash.com/400x300/?paris' },
  { name: 'Maldives', image: 'https://source.unsplash.com/400x300/?maldives' },
];

const FeaturedDestinations = () => {
  return (
    <section className="featured-destinations">
      <h2>Popular Destinations</h2>
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <div key={index} className="destination">
            <img src={destination.image} alt={destination.name} />
            <h3>{destination.name}</h3>
            <button className="btn-secondary">Explore</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
