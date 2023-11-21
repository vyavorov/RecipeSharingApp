import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import AboutUs from './components/about/AboutUs';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/catalog" element={<Catalog />}/>
        <Route path="/about" element={<AboutUs />}/>
      </Routes>
    </>
  )
}

export default App
