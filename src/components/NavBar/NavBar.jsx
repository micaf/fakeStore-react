import { useEffect, useState  } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import CartWidget from '../CartWidget/CartWidget';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './NavBar.css';

import { upperFirstLetter } from '../../shared/Utils'
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

        const getAllCategories = async () => {
            const docs = await getCategories();
            setCategories(docs);
          };
          getAllCategories();
    
        // axios(`${import.meta.env.VITE_BASE_URL}/products/categories`).then((json) =>
        //    setCategories(json.data)
        //  );
   }, [categories]);



    useEffect(() => {
        setIsCheckoutPage(location.pathname === '/checkout');
    }, [location]);


    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <a href="/" id="NavLogo">
                        <StoreMallDirectoryIcon sx={{ width: '60px', height: '40px', color: '#000000' }} />
                    </a>
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
                            style: { minWidth: '100vw', display: 'inline-flex',flexDirection:'row', justifyContent:'space-around' },
                          }}
                          getcontentanchorel={null}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                          anchorPosition={ {top: 160, left: 0 }}
                          sx={{top:'40px',}}
                    >
                        {categories.map((category, index) => <MenuItem key={index}><Link to={`/category/${category}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>
                            {upperFirstLetter(category)}
                        </Link></MenuItem>)}


                    </Menu>
                    <Link id="Shop" to="/shop">
                        Shop
                    </Link>
                    <Link id="Contact" to="/contact">
                        Contact
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