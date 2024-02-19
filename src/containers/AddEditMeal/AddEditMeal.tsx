import React, {useCallback, useEffect, useState} from 'react';
import {Meal} from '../../types';
import axiosAPI from '../../axiosAPI';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

const initialMeal = {
  description: '',
  calories: '',
  category: '',
  date: `${year}-${month}-${day}T${hours}:${minutes}`
};

interface Props {
  edit?: boolean
}
const AddEditMeal: React.FC<Props> = ({edit= false}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal>(initialMeal);
  const [loading, setLoading] = useState(false);

  const changeMeal = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    setMeal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getMealForEditing = useCallback(async () => {
    if (edit) {
      try {
        setLoading(true);
        const {data} = await axiosAPI.get<Meal | null>(`/meal/${params.id}.json`);
        if (data) {
          setMeal({...data});
        }
      } catch {
        alert('Please check URL!');
      } finally {
        setLoading(false);
      }
    }
  }, [params.id, edit]);

  useEffect(() => {
    void getMealForEditing();
  }, [getMealForEditing]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
       setLoading(true);
       if (edit) {
         await axiosAPI.put(`/meal/${params.id}.json`, meal);
       } else {
         await axiosAPI.post('/meal.json', meal);
         navigate('/');
       }
     } catch {
       alert('Please check URL!');
     } finally {
       setLoading(false);
     }
  };

  const mealCategories = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];

  return (
    <>
      {loading ? <Spinner/> :
        <form className="px-2" onSubmit={onFormSubmit}>
          <h2>{edit ? 'Edit meal' : 'Add meal'}</h2>
          <select
            className="form-select w-25"
            name="category"
            onChange={changeMeal}
            required
          >
            <option value="">--Choose meal category</option>
            {mealCategories.map(category => <option value={category} key={category}>{category}</option>)}
          </select>

          <input
            className="form-control w-25 my-3"
            type="text"
            name="description"
            value={meal.description}
            onChange={changeMeal}
            required
          />

          <input
            className="form-control w-25 my-3"
            max={`${year}-${month}-${day}T${hours}:${minutes}`}
            type='datetime-local'
            name='date'
            value={meal.date}
            onChange={changeMeal}
            required
          />

          <div className="d-flex align-items-center">
            <input
              style={{width: '15%'}}
              className="form-control me-2"
              id="calories"
              type="number"
              name="calories"
              value={meal.calories}
              placeholder="Calories"
              onChange={changeMeal}
              required
            />
            <label htmlFor="calories">kcal</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
          >
            Save
          </button>
        </form>
      }
    </>
  );
};

export default AddEditMeal;