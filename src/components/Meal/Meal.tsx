import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axiosAPI from '../../axiosAPI';

interface Props {
  id: string
  mealType: string,
  description: string,
  calories: string,
  mealDate: string,
  rerender: () => void
}
const Meal: React.FC<Props> = ({id, mealType, description, calories,mealDate, rerender}) => {
  const [dis, setDis] = useState(false);

  const onDelete = async (id:string) => {

    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      try {
        setDis(true);
        await axiosAPI.delete(`/meal/${id}.json`);
        rerender();
      } catch {
        alert('Please check URL!');
      } finally {
        setDis(false);
      }
    }
  };
  return (
    <div className='d-flex justify-content-between align-items-center mx-2 border border-info rounded p-3 mt-3'>
      <div>
        <h3 className='me-3'>{mealType}</h3>
        <strong>{description}</strong>
        <span className='d-block'>Meal time: {mealDate.split('T').join(' ')}</span>
      </div>
      <div>
        <strong>{calories} kcal</strong>
        <Link to={`/edit/${id}`} className='btn btn-success ms-5 me-2'>Edit</Link>
        <button type='button' className='btn btn-danger' onClick={() => onDelete(id)} disabled={dis}>Delete</button>
      </div>
    </div>
  );
};

export default Meal;