// React router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Provider
import { CommerceProvider } from './context/CommerceContext';
//Componentes
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import DetailPage from './pages/DetailPage/DetailPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import './App.css'

function App() {
  return (
    <CommerceProvider>
      <div className="container">
        <div className="content">
          <Router>
            <div className="header"><span>UP TO 50% 0FF SALE</span></div>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/category/:category/detail/:id" element={<DetailPage />} />
              <Route path="/category/:category" element={<ShopPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
            <div className="footer"><span>Fuentes Micaela - 2023 - Fake Store</span></div>
          </Router>
        </div>
      </div>
    </CommerceProvider>

  )
}

export default App
