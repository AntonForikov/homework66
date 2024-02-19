import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  id: string
  mealType: string,
  description: string,
  calories: string
  onDelete: () => void;
}
const Meal: React.FC<Props> = ({id, mealType, description, calories,onDelete}) => {
  return (
    <div className='d-flex justify-content-between align-items-center mx-2 border border-info rounded p-3 mt-3'>
      <div>
        <h3>{mealType}</h3>
        <span>{description}</span>
      </div>
      <div>
        <strong>{calories} kcal</strong>
        <Link to={`/edit/${id}`} className='btn btn-success ms-5 me-2'>Edit</Link>
        <button type='button' className='btn btn-danger' onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Meal;