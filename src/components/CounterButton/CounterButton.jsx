import { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import './CounterButton.css'


const CounterButton = ({ initialStock, totalItems, onChangeItems, disabled }) => {
    const [items, setItems] = useState(totalItems);
    const [stock, setStock] = useState(initialStock);
    const [showWarningStock, setShowWarningStock] = useState(false)

    useEffect(() => {
        setItems(totalItems)
        setStock(initialStock)
      }, [initialStock, totalItems])

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
            onChangeItems(items + 1);
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
                    disabled={disabled}
                >
                    -
                </button>
                <span className='item'>{items}</span>
                <button
                    className='counter'
                    onClick={handleAdd}
                    disabled={disabled}
                >
                    +
                </button>
            </div>
            {(showWarningStock || disabled) && <Typography sx={{ fontSize: 10, marginTop: 1, textAlign: 'center' }} color="text.secondary">
                No more stock available
            </Typography>}
        </div >
    )
}


export default CounterButton;