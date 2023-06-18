import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import './DetailPage.css'

function DetailPage() {

  const [product, setProduct] = useState({});

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      axios(`${import.meta.env.VITE_BASE_URL}/products/${id}`).then((json) =>
        setProduct(json.data))
    }
  }, []);

  return (
    <>
      <div className="product-container">
        <Card sx={{ maxWidth: 400, margin: 10, padding: 10 }}>
          <CardActionArea>
            <CardMedia component="img" image={product.image} alt="product image" sx={{ height: 100, width: "auto", margin: "auto", marginTop: 2 }} />
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
      </div>

    </>
  )
}

export default DetailPage