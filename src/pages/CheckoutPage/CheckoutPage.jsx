import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import './CheckoutPage.css';
import StyledButton from '../../components/StyledButton/StyledButton';

const CheckoutPage = () => {
  const [formCheckout, setFormCheckout] = useState({
    name: '',
    surname: '',
    email: '',
    confirmEmail: '',
    city: '',
    zipCode: '',
    phone: ''
  })
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleUpdateForm = (e, value) => {
    setFormCheckout({...value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para procesar la compra
  };

  return (
   

<div className="checkout-container">
<Card sx={{ width: 1000, height: 600, margin: 2, padding: 10, borderRadius: '16px', }}>
<CardContent>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Typography variant="h6">ORDER SUMMARY</Typography>
            <ul>
              <li>Producto 1</li>
              <li>Producto 2</li>
              <li>Producto 3</li>
              {/* Agrega aquí la lista de los productos comprados */}
            </ul>
          </div>
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <Typography variant="h6">Datos de Compra</Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                type="string"
                fullWidth
                value={formCheckout.name}
                onChange={(e) => handleUpdateForm(e.target.value, 'name')}
                required
                margin="normal"
              />
               <TextField
                label="Surname"
                type="string"
                fullWidth
                value={formCheckout.surname}
                onChange={(e) => handleUpdateForm(e.target.value, 'surname')}
                required
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={formCheckout.email}
                onChange={(e) => handleUpdateForm(e.target.value, 'email')}
                required
                margin="normal"
              />
              <TextField
                label="Confirm Email"
                type="email"
                fullWidth
                value={formCheckout.confirmEmail}
                onChange={(e) => handleUpdateForm(e.target.value, 'confirmEmail')}
                required
                margin="normal"
              />
               <TextField
                label="City"
                type="string"
                fullWidth
                value={formCheckout.city}
                onChange={(e) => handleUpdateForm(e.target.value, 'city')}
                required
                margin="normal"
              />
               <TextField
                label="Zip Code"
                type="numnber"
                fullWidth
                value={formCheckout.zipCode}
                onChange={(e) => handleUpdateForm(e.target.value,'zipCode')}
                required
                margin="normal"
              />
               <TextField
                label="Phone"
                type="phone"
                fullWidth
                value={formCheckout.phone}
                onChange={(e) => handleUpdateForm(e.target.value, 'phone')}
                required
                margin="normal"
              />
              <StyledButton text="Purchase" onSubmit/>
            </form>
          </div>
        </div>
      </CardContent>

</Card>
</div>
 
  );
};

export default CheckoutPage;