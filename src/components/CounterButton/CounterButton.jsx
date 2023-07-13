import React, { useState } from 'react';
import { Typography } from "@mui/material";
import './CounterButton.css'


const CounterButton = ({ initialStock, totalItems, onChangeItems }) => {
    const [items, setItems] = useState(totalItems);
    const [stock, setStock] = useState(initialStock);
    const [showWarningStock, setShowWarningStock] = useState(false)

    const handleRemove = () => {
        if (items > 0) {
            setShowWarningStock(false)
            setItems(items - 1);
            setStock(stock + 1)
            onChangeItems(items - 1, stock + 1);
        }
    };

    const handleAdd = () => {
        if (items < stock) {
            setItems(items + 1);
            setStock(stock - 1)
            onChangeItems(items + 1, stock + 1);
            setShowWarningStock(false)
        } else {
            setShowWarningStock(true)
        }
    };

    return (
        <div className='containter-counter'>
            <div>
                <button
                    className='counter'
                    onClick={handleRemove}
                >
                    -
                </button>
                <span className='item'>{items}</span>
                <button
                    className='counter'
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>
            {showWarningStock && <Typography sx={{ fontSize: 10, marginTop: 1, textAlign: 'center' }} color="text.secondary">
                No more stock available
            </Typography>}
        </div >
    )
}


export default CounterButton;