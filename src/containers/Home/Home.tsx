import React, {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import {MealApi, MealWithId} from '../../types';
import Meal from '../../components/Meal/Meal';
import Spinner from '../../components/Spinner/Spinner';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<MealWithId[]>([]);

  const getMeals = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await axiosAPI.get<MealApi | null>('/meal.json');
      if (data) {
        const ids = Object.keys(data);
        const yesterday= new Date().getDate() - 1;
        const todayMealsId= ids.filter(id => new Date(data[id].date).getDate() > yesterday);

        setMeals(todayMealsId.map((id) => ({
          ...data[id],
          id
        })).reverse());
      }
      if (!data) {
        setMeals([]);
      }
    } catch {
      alert('Please check URL!');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getMeals();
  }, [getMeals]);

  return (
    <>
      <div className="d-flex justify-content-between px-2 mt-3">
        <span>Total calories: <strong>
          {meals.reduce((sum, meal) => {
            return sum + parseInt(meal.calories);
          }, 0)} kcal
        </strong></span>
        <Link to="/add-new-meal" className="btn btn-primary">Add new meal</Link>
      </div>
      {loading ? <Spinner/> :
        <>
          {!loading && meals.length < 1 ?
            <div className="alert alert-primary px-2 mt-3 mx-2">There is no meals for today in database!</div> :
            meals.map(meal => {
              return <Meal
                key={meal.id}
                id={meal.id}
                mealType={meal.category}
                description={meal.description}
                calories={meal.calories}
                mealDate={meal.date}
                rerender={getMeals}
              />;
            })
          }
        </>
      }
    </>
  );
};

export default Home;