import { useState, Fragment } from 'react';
import {
    Card, CardContent, Typography, TextField, Box,
    CardMedia, List, ListItem, Divider
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './CheckoutPage.css';
import StyledButton from '../../components/StyledButton/StyledButton';


const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    surname: yup
        .string('Enter your surname')
        .required('Surname is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    confirmEmail: yup
        .string("Confirm your email")
        .oneOf([yup.ref('email'), null], 'Emails do not match')
        .required('Confirm Email is required'),
    city: yup
        .string('Enter your city')
        .required('City is required'),
    zipCode: yup
        .string('Enter your zip code')
        .required('Zip Code is required'),
    phone: yup
        .string('Enter your phone')
        .required('Phone is required')
});

const redirectButtonStyle = {
    fontSize: 13, fontWeight: 'bold', cursor: "pointer",
    "&:hover": {
        textDecoration: "underline",
        textTransform: "uppercase"
    },
};


const CheckoutPage = () => {
    const [totalItems, setTotalItems] = useState({ quantity: 1, amount: 300 })
    const [selectedProducts, setSelectedProducts] = useState([{
        "id": 1,
        "title": "Fjallraven Backpack",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "Men",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "stock": 2000,
        "count": 0,
        "isFavorite": false
    },
    {
        "id": 2,
        "title": "Premium Slim Fit",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "Men",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "stock": 2000,
        "count": 0,
        "isFavorite": false
    },
    {
        "id": 3,
        "title": "Cotton Jacket",
        "price": 55.99,
        "description": "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "Men",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "stock": 2000,
        "count": 0,
        "isFavorite": false
    },
    {
        "id": 4,
        "title": "Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "Men",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "stock": 2000,
        "count": 0,
        "isFavorite": false
    }])

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            confirmEmail: '',
            city: '',
            zipCode: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    const handleSubmit = (values) => {
        // Aquí puedes agregar la lógica para procesar la compra
    };

    return (
        <div className="checkout-container">
            <Card sx={{ width: 1000, height: 600, margin: 2, padding: 10, borderRadius: '16px' }}>
                <CardContent>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>ORDER SUMMARY</Typography>
                            {/* Agrega aquí la lista de los productos comprados */}
                            <List sx={{ height: '450px', overflowY: 'scroll' }} className='custom-scroll'>
                                {selectedProducts.map((product) => (
                                    <Fragment key={product.id}>
                                        <ListItem disablePadding sx={{ marginLeft: 1 }}>
                                            <Divider />
                                            <Card sx={{ width: '90%', margin: '10px 0px', padding: 1, borderRadius: '16px' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <CardMedia
                                                        component="img"
                                                        image={product.image}
                                                        alt="product image"
                                                        sx={{ height: 100, maxWidth: "30%", margin: "auto", marginTop: 1, objectFit: 'contain', padding: '5px' }}
                                                    />
                                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', width: "70%" }}>
                                                        <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>
                                                            {product.title}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                            <Typography sx={{ fontSize: 13, fontWeight: 'bold', color: '#D32F2F', marginRight: 1 }}>
                                                                ${product.price}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: 13, color: '#000000' }}>
                                                                QTY: {product.count}
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        </ListItem>
                                    </Fragment>
                                ))}
                            </List>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Typography sx={{ fontSize:20, fontWeight: 'bold' }}>TOTAL: ${totalItems.amount}</Typography>
                            <Typography component="div" noWrap sx={redirectButtonStyle} >
                                    Edit your order
                            </Typography>
                        </div>
                        <div style={{ flex: 1, marginLeft: '20px' }}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>COSTUMER INFORMATION</Typography>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Enter your name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    sx={{ marginBottom: 2, marginTop: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="surname"
                                    name="surname"
                                    label="Enter your surname"
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                                    helperText={formik.touched.surname && formik.errors.surname}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Enter your email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    label="Confirm your email"
                                    value={formik.values.confirmEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                                    helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="city"
                                    name="city"
                                    label="Enter your city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="zipCode"
                                    name="zipCode"
                                    label="Enter your zip code"
                                    value={formik.values.zipCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="Enter your phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    sx={{ marginBottom: 2 }}
                                />
                                <StyledButton text="Purchase" type="submit" disabled={formik.isValidating || !formik.isValid} />
                            </form>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CheckoutPage;
