import ShoppingCart from "../ShoppingCart/ShoppingCart"
import Logo from '../../assets/store-svg.svg'
import './NavBar.css';

function NavBar() {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <a href="/" id="NavLogo">
                        <img src={Logo} alt="Fake Logo" width="30" height="20"></img>
                    </a>
                    <span>FAKE STORE</span>
                </div>
                <div className="links">
                    <a href="/" id="ShopLink">
                        Shop
                    </a>
                    <a href="/" id="About-Us">
                        About Us
                    </a>
                    <a href="/" id="Contact">
                        Contact
                    </a>
                    <a href="/" id="Cart">
                        <ShoppingCart />
                    </a>
                </div>
            </nav>
        </>
    )
}

export default NavBar