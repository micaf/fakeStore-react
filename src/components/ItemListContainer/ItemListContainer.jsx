import { Link } from "react-router-dom";
import {
  CardActions,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Tooltip
} from "@mui/material";
import './ItemListContainer.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

import { upperFirstLetter } from '../../shared/Utils'

const buttonSX = {
  fontSize: 13, fontFamily: 'Monospace', fontWeight: 'bold', cursor: "pointer",
  "&:hover": {
    textDecoration: "underline"
  },
};



function ItemListContainer({ products }) {
  return (
    <>
      <div className="products-grid">
        {products.map(product => {
          return (
            <Card key={product.id} sx={{ maxWidth: 320, heigh: 500, width: 400, borderRadius: '16px', margin: 2 }}>
              <CardMedia component="img" image={product.image} alt="product image" sx={{ maxHeight: 150, width: "auto", margin: "auto", marginTop: 1, marginBottom: 2 }} />
              <CardContent sx={{ backgroundColor: '#EEE7ED', borderRadius: '16px', height: '100%' }}>
                <div className="information-container">
                  <Link
                    to={`/detail/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography component="div" noWrap sx={buttonSX} >
                      {product.title.toUpperCase()}
                    </Typography>
                  </Link>
                  <Typography component="div" sx={{ fontSize: 13, fontFamily: 'Monospace', fontWeight: 'light' }}>
                    {upperFirstLetter(product.category)}
                  </Typography>
                </div>
                <div className="options-container">
                  <Typography variant="body4" color="text.secondary" sx={{ color: '#DA555D' }}>
                    <b>${product.price}</b>
                  </Typography>
                  <CardActions disableSpacing>
                    <Tooltip title="Add to Favorites">
                      <IconButton aria-label="Add to Favorites">
                        <FavoriteIcon sx={{ color: '#F24B4B' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                      <IconButton aria-label="Add to Cart">
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  )
}

export default ItemListContainer