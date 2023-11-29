import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import AboutUs from './components/about/AboutUs';
import Logout from './components/header/Logout';
import Login from './components/header/Login';
import Register from './components/header/Register';
import CreateRecipe from './components/create-recipe/CreateRecipe';
import RecipeDetails from './components/recipe-details/RecipeDetails';
import EditRecipe from './components/edit-recipe/EditRecipe';

function App() {
  return (
    <>
      <AuthProvider>
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
          <Route path="/catalog/recipes/:recipeId/edit" element={<EditRecipe />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
