
import {
    CardActions,
    IconButton,
    Typography,
    CardMedia,
    CardContent,
    Card,
    Tooltip,
    Link
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';

const redirectButtonStyle = {
    fontSize: 13, fontWeight: 'bold', cursor: "pointer",
    "&:hover": {
        textDecoration: "underline",
        textTransform: "uppercase"
    },
};


function ItemListCard({ product }) {
    return (
        <>
            <Card sx={{ maxWidth: 320, height: 350, width: 400, borderRadius: '16px', margin: 2 }}>
                <CardMedia component="img" image={product.image} alt="product image" sx={{ maxHeight: 150, width: "auto", margin: "auto", marginTop: 1, marginBottom: 2, padding:'20px' }} />
                <CardContent sx={{ backgroundColor: '#FFFFFFF', borderRadius: '16px', height: '100%', borderTop: '#000000 solid 1px' }}>
                    <div className="information-container">
                        <Link
                            href={`/detail/${product.id}`}
                            color="inherit"
                            underline="hover"
                        >
                            <Typography component="div" noWrap sx={redirectButtonStyle} >
                                {product.title}
                            </Typography>
                        </Link>
                        <Typography component="div" sx={{ fontSize: 13, fontWeight: 'light', textTransform: 'capitalize' }}>
                            {product.category}
                        </Typography>
                    </div>
                    <div className="options-container">
                        <Typography variant="body4" sx={{ color: '#D32F2F' }}>
                            <b>${product.price}</b>
                        </Typography>
                        <CardActions disableSpacing>
                        <Tooltip title="Add to Cart">
                                <IconButton aria-label="Add to Cart">
                                    <AddIcon  sx={{ color: '#000000' }} />
                                </IconButton>
                            </Tooltip>
                            {product.isFavorite ?  <Tooltip title="Remove to Favorites">
                                <IconButton aria-label="Remove to Favorites">
                                    <FavoriteIcon sx={{ color: '#000000' }} />
                                </IconButton>
                            </Tooltip> :  <Tooltip title="Add to Favorites">
                                <IconButton aria-label="Add to Favorites">
                                    <FavoriteBorderIcon sx={{ color: '#000000' }} />
                                </IconButton>
                            </Tooltip>}
                           
                            
                        </CardActions>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ItemListCard