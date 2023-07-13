// React router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Componentes
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import ContactPage from './pages/ContactPage/ContactPage';
import DetailPage from './pages/DetailPage/DetailPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import './App.css'
// Context
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <div className="container">
      <div className="content">
        <CartProvider>
          <Router>
            <div className="header"><span>UP TO 50% 0FF SALE</span></div>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<ShopPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/category/:category/detail/:id" element={<DetailPage />} />
              <Route path="/category/:category" element={<ShopPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <div className="footer"><span>Fuentes Micaela - 2023 (Fake Store)</span></div>
          </Router>
        </CartProvider>
      </div>

    </div>

  )
}

export default App
