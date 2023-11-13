import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Catalog from './components/Catalog';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/catalog" element={<Catalog />}/>
        <Route path="/about" element={<AboutUs />}/>
      </Routes>

      <Footer />
    </>
  )
}

export default App
