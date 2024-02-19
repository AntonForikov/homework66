import React from 'react';

interface Props {
  mealType: string,
  description: string,
  calories: string
}
const Meal: React.FC<Props> = ({mealType, description, calories}) => {
  return (
    <div className='d-flex justify-content-between align-items-center mx-2 border border-info rounded p-3 mt-3'>
      <div>
        <h3>{mealType}</h3>
        <span>{description}</span>
      </div>
      <div>
        <strong>{calories} kcal</strong>
        <button type='button' className='btn btn-primary ms-5 me-2'>Edit</button>
        <button type='button' className='btn btn-danger'>Delete</button>
      </div>
    </div>
  );
};

export default Meal;