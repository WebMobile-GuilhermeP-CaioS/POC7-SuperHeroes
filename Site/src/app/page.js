"use client";

import HeroCard from '../components/HeroCard';
import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://superheroapi.com/api/1d2d0c957b5f88ca2c1357ce6670cae7/';

export default function Home() {
    const [heroes, setHeroes] = useState([]);

      useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroIds = [200, 1, 3, 465, 5];
        const heroData = await Promise.all(heroIds.map(async (id) => {
          const response = await fetch(`${BASE_URL}${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }));
        setHeroes(heroData);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
      }
    };

    fetchHeroes();
  }, []);
  
    return (
      <div className="heroes">
        {heroes.map(hero => (
          <HeroCard
            key={hero.id}
            name={hero.name}
            intelligence={hero.powerstats.intelligence}
            strength={hero.powerstats.strength}
            image={hero.image.url}
          />
        ))}
      </div>
  );
}
