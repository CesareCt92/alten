import React from 'react';
import './BreweryCard.css';

const BreweryCard = ({ brewery }) => {
  return (
    <div className="brewery-card">
      <h2>{brewery.name}</h2>
      <p>Tipo: {brewery.brewery_type}</p>
      <p>Posizione: {brewery.city}, {brewery.state_province}</p>
      <p>Indirizzo: {brewery.address_1}</p>
      <p>Numero: {brewery.phone}</p>
      {brewery.website_url ? (
        <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
          Sito Web
        </a>
      ) : (
        <a className="noLink" rel="noopener noreferrer">
          Nessun sito web
        </a>
      )}
    </div>
  );
};

export default BreweryCard;
