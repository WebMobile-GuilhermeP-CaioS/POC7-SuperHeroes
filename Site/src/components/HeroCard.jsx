import React from 'react';

const HeroCard = ({ name, intelligence, strength, image }) => {
  return (
    <article>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <p>Intelligence: <span style={{ width: `${intelligence}%`, backgroundColor: '#F9B32F' }}></span></p>
      <p>Strength: <span style={{ width: `${strength}%`, backgroundColor: '#FF7C6C' }}></span></p>
    </article>
  );
};

export default HeroCard;