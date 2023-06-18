import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import CartWidget from '../CartWidget/CartWidget';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Logo from '../../assets/store-svg.svg'
import './NavBar.css';


function NavBar() {

    const [categories, setCategories] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const upperFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        axios(`${import.meta.env.VITE_BASE_URL}/products/categories`).then((json) =>
            setCategories(json.data)
        );
    }, []);


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
                    <a aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} id="ShopLink">
                        Categories
                    </a>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {categories.map((category, index) => <MenuItem key={index}><Link to={`/category/${category}`} style={{ textDecoration: 'none' }}>
                            {upperFirstLetter(category)}
                        </Link></MenuItem>)}


                    </Menu>
                    <Link id="About-Us" to="/about">
                        About Us
                    </Link>
                    <Link id="Contact" to="/contact">
                        Contact
                    </Link>
                    <a href="/" id="Cart">
                        <CartWidget />
                    </a>
                </div>
            </nav>
        </>
    )
}

export default NavBar