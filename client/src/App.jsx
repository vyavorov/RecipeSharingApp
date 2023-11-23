import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import AboutUs from './components/about/AboutUs';
import Logout from './components/header/Logout';
import Login from './components/header/Login';
import Register from './components/header/Register';
import CreateRecipe from './components/create-recipe/CreateRecipe';
import RecipeDetails from './components/recipe-details/RecipeDetails';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = (values) => {
    console.log(values)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login loginSubmitHandler={loginSubmitHandler}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog/create-recipe" element={<CreateRecipe />} />
        <Route path="/catalog/recipes/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </>
  )
}

export default App
