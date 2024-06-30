// components/Card/BreweryList.jsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BreweryCard from './BreweryCard';

const BreweryList = ({ breweries }) => {
  return (
    <div className="brewery-list">
      <Row className="brewery-list-container">
        {breweries.map(brewery => (
          <Col key={brewery.id} xs={12} sm={6} md={4}>
            <BreweryCard brewery={brewery} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BreweryList;
