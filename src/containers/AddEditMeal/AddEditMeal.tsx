import React, {useState} from 'react';
import {Meal} from '../../types';
import axiosAPI from '../../axiosAPI';

const initialMeal = {
  description: '',
  calories: '',
  category: '',
  date: new Date()
};
const AddEditMeal: React.FC = () => {
  const [meal, setMeal] = useState<Meal>(initialMeal);

  const changeMeal = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    setMeal((prevState) => ({
      ...prevState,
      [name]: value,
      date: new Date()
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => { // TODO Add loader
    e.preventDefault();
     try {
       await axiosAPI.post('/meal.json', meal);
     } catch {
       alert('Please check URL!');
     }
  };


  const mealCategories = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];

  return (
    <form className="px-2" onSubmit={onFormSubmit}>
      <h2>Add meal</h2>
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
        placeholder="Meal Description"
        value={meal.description}
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
        className="btn btn-success mt-3"
      >
        Save
      </button>
    </form>
  );
};

export default AddEditMeal;