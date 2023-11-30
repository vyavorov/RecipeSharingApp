import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import AboutUs from './components/about/AboutUs';
import Logout from './components/logout/Logout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import CreateRecipe from './components/create-recipe/CreateRecipe';
import RecipeDetails from './components/recipe-details/RecipeDetails';
import EditRecipe from './components/edit-recipe/EditRecipe';
import DeleteRecipe from './components/delete-recipe/DeleteRecipe';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/create-recipe" element={<CreateRecipe />} />
            <Route path="/catalog/recipes/:recipeId" element={<RecipeDetails />} />
            <Route path="/catalog/recipes/:recipeId/edit" element={<EditRecipe />} />
            <Route path="/catalog/recipes/:recipeId/delete" element={<DeleteRecipe />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
