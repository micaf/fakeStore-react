import { useState, Fragment, useContext, useEffect } from 'react';
import {
    Card, CardContent, Typography, TextField, Box,
    CardMedia, List, ListItem, Divider
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './CheckoutPage.css';
import StyledButton from '../../components/StyledButton/StyledButton';
import CartContent from '../../components/CartContent/CartContent'
import { CommerceContext } from '../../context/CommerceContext';
import { addPurchase } from '../../service/firebaseService';


const validationSchema = yup.object({
    name: yup
        .string('Enter your Name')
        .required('Name is required'),
    surname: yup
        .string('Enter your Surname')
        .required('Surname is required'),
    email: yup
        .string('Enter your Email')
        .email('Enter a valid Email')
        .required('Email is required'),
    confirmEmail: yup
        .string("Confirm your Email")
        .oneOf([yup.ref('email'), null], 'Emails do not match')
        .required('Confirm Email is required'),
    city: yup
        .string('Enter your City')
        .required('City is required'),
    zipCode: yup
        .number('Enter your Zip Code')
        .typeError("That doesn't look like a Zip Code")
        .required('Zip Code is required')
        .positive("A Zip Code can't start with a minus")
        .integer("A Zip Code can't include a decimal point"),
    phone: yup
        .number('Enter your Phone Number')
        .typeError("That doesn't look like a Phone Number")
        .required('Phone is required')
        .positive("A Phone Number can't start with a minus")
        .integer("A Phone Number can't include a decimal point")
});

const redirectButtonStyle = {
    fontSize: 13, fontWeight: 'bold', cursor: "pointer",
    "&:hover": {
        textDecoration: "underline",
        textTransform: "uppercase"
    },
};


const CheckoutPage = () => {
    const { state, dispatch } = useContext(CommerceContext);
    const [productsItems, setProductItems] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [showPurchaseInformation, setShowPurchaseInformation] = useState(false);
    const [purchaseInformation, setPurchaseInformation] = useState({ title: '', message: '' })

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
            const purchaseData = {values, products: productsItems}
            addPurchase(purchaseData)
                .then((purchaseId) => {
                    if (purchaseId) {
                        setPurchaseInformation({ title: 'Successful Purchase', message: `Thank you for your purchase! Purchase successfully added. Purchase ID: ${purchaseId}` })
                        dispatch({ type: 'SET_PRODUCTS_SELECTED', payload: {} });
                    } else {
                        setPurchaseInformation({ title: 'Purchase error', message: 'There was an error processing the purchase. We are sorry for the inconvenience' })
                    }
                    setShowPurchaseInformation(true)
                });
        },
    });

    useEffect(() => {
        const keys = Object.keys(state.productsSelected)
        let productSelected = []
        if (keys.length) {
            keys.forEach(key => {
                productSelected.push(state.productsSelected[key])
            })
            setProductItems(productSelected);
        }


    }, [state.productsSelected]);


    return (
        <div className="checkout-container">
            <Card sx={{ width: 1000, height: 600, margin: 2, padding: 10, borderRadius: '16px' }}>
                <CardContent>
                    {!showPurchaseInformation ? (<div style={{ display: 'flex' }}>
                        {
                            productsItems.length > 0 && !isEditing && <div style={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ORDER SUMMARY</Typography>
                                <List sx={{ height: '450px', overflowY: 'scroll' }} className='custom-scroll'>
                                    {productsItems.map((product) => (
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
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>TOTAL: ${state.totalItems.amount}</Typography>
                                <Typography component="div" onClick={() => setIsEditing(!isEditing)} noWrap sx={redirectButtonStyle} >
                                    Edit your order
                                </Typography>
                            </div>
                        }
                        {(isEditing || productsItems.length === 0) && <div style={{ flex: 1 }}>
                            <CartContent isCheckout={true} />
                            {productsItems.length > 0 && <Typography component="div" onClick={() => setIsEditing(!isEditing)} noWrap sx={redirectButtonStyle} >
                                Checkout
                            </Typography>}
                        </div>}
                        <div style={{ flex: 1, marginLeft: '20px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>COSTUMER INFORMATION</Typography>
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
                                    disabled={!productsItems.length || isEditing}
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
                                    disabled={!productsItems.length || isEditing}
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
                                    disabled={!productsItems.length || isEditing}
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
                                    disabled={!productsItems.length || isEditing}
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
                                    disabled={!productsItems.length || isEditing}
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
                                    disabled={!productsItems.length || isEditing}
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
                                    disabled={!productsItems.length || isEditing}
                                    sx={{ marginBottom: 2 }}
                                />
                                <StyledButton text="Purchase" type="submit" disabled={formik.isValidating || !formik.isValid || !formik.dirty || !productsItems.length} />
                            </form>
                        </div>
                    </div>) :
                        (
                            <Box sx={{  display: 'inline-flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '300px'}}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bold'}}>
                                    {purchaseInformation.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {purchaseInformation.message}
                                </Typography>
                            </Box>
                        )}
                </CardContent>
            </Card>



        </div>
    );
};

export default CheckoutPage;
