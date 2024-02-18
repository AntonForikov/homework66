import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import AddEditMeal from './containers/AddEditMeal/AddEditMeal';

function App() {
  return (
    <>
      <h1 className='border-bottom p-2'>Calorie tracker</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-new-meal' element={<AddEditMeal />} />
        <Route path='*' element={<h1>Not Found</h1>}/>
      </Routes>
    </>
  );
}

export default App;
