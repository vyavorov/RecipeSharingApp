import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import AboutUs from './components/about/AboutUs';
import CreateRecipe from './components/create-recipe/CreateRecipe';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/catalog" element={<Catalog />}/>
        <Route path="/about" element={<AboutUs />}/>
        <Route path="/catalog/create-recipe" element={<CreateRecipe />}/>
      </Routes>
    </>
  )
}

export default App
