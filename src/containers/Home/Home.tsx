import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <span>Total calories: <strong>900 kcal</strong></span>
      <Link to='/add-new-meal'>Add new meal</Link>
    </div>
  );
};

export default Home;