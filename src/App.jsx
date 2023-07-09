// React router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Componentes
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import DetailPage from './pages/DetailPage/DetailPage';

import './App.css'

// Context
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/category/:category/detail/:id" element={<DetailPage />} />
          <Route path="/category/:category" element={<HomePage />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
