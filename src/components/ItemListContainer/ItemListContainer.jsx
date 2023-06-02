import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import './ItemListContainer.css'

function ItemListContainer({products}) {
    return (
        <>
            <div className="products-grid">
                {products.map(product => {
                    return (
                        <Card  key={product.id} sx={{ maxWidth: 320 }}>
                        <CardActionArea>
                          <CardMedia component="img" image={product.image} alt="product image" sx={{ height: 100, width:"auto", margin: "auto", marginTop:2 }} />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {product.title}
                            </Typography>
                            <Typography variant="body4" color="text.secondary">
                              {product.description}
                            </Typography>
                            <br></br>
                            <br></br>
                            <Typography variant="body4" color="text.secondary">
                              <b>${product.price}</b>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    );
                })}
            </div>
        </>
    )
}

export default ItemListContainer