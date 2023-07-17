import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import CartWidget from '../CartWidget/CartWidget';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './NavBar.css';

import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import { getCategories } from "../../service/firebaseService";

function NavBar() {
    const [categories, setCategories] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    const [isCheckoutPage, setIsCheckoutPage] = useState(false);

    const open = Boolean(anchorEl);

    const location = useLocation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getAllCategories = () => {
            const docs = getCategories();
            setCategories(docs.categories);
        };
        getAllCategories();
    }, [categories]);



    useEffect(() => {
        setIsCheckoutPage(location.pathname === '/checkout');
    }, [location]);


    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link id="home" to="/home">
                        <StoreMallDirectoryIcon sx={{ width: '60px', height: '40px', color: '#000000' }} />
                    </Link>
                </div>
                <div className="links">
                    <Link id="Shop" to="/shop">
                        Shop
                    </Link>
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
                            style: { minWidth: '100vw', display: 'inline-flex', flexDirection: 'row', justifyContent: 'space-around' },
                        }}
                        getcontentanchorel={null}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        anchorPosition={{ top: 160, left: 0 }}
                        sx={{ top: '40px', }}
                    >
                        {categories.map((category, index) => <MenuItem key={index}><Link to={`/category/${category}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>
                            {category}
                        </Link></MenuItem>)}


                    </Menu>
                    <Link id="Favorites" to="/favorites">
                       Favorites
                    </Link>
                </div>
                {!isCheckoutPage && (<div className="cart">
                    <a href="/" id="Cart">
                        <CartWidget />
                    </a>
                </div>)}
            </nav>
        </>
    )
}

export default NavBar