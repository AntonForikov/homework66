import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className='d-flex justify-content-between px-2'>
      <span>Total calories: <strong>900 kcal</strong></span>
      <Link to='/add-new-meal' className='btn btn-primary'>Add new meal</Link>
    </div>
  );
};

export default Home;