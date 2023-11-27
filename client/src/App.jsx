import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as authService from './services/authService';
import AuthContext from './contexts/authContext';

import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import AboutUs from './components/about/AboutUs';
import Logout from './components/header/Logout';
import Login from './components/header/Login';
import Register from './components/header/Register';
import CreateRecipe from './components/create-recipe/CreateRecipe';
import RecipeDetails from './components/recipe-details/RecipeDetails';

function App() {
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem('accessToken');

    return {};
  });
  const navigate = useNavigate();

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);
    navigate('/');
  }

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(values.email, values.password);
    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);
    navigate('/');
  }

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('accessToken');
  }

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username,// || auth.email.Split('@')[0],
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
  }

  return (
    <>
      <AuthContext.Provider value={values}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog/create-recipe" element={<CreateRecipe />} />
          <Route path="/catalog/recipes/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
