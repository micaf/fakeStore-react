import { useEffect, useContext, useState } from "react";
import { CommerceContext } from '../../context/CommerceContext';
import ItemListContainer from "../../components/ItemListContainer/ItemListContainer";
import {Typography, CircularProgress} from "@mui/material";
import './FavoritesPage.css'


function FavoritesPage() {
  const { state, dispatch } = useContext(CommerceContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(true)
      setFavorites(state.productsFavorites);
      setLoading(false)
  }, [state.productsFavorites]);


  return (
    <div className="favorite-container">
      <Typography sx={{ fontSize: 'h5.fontSize', fontStyle: 'oblique', padding: 2, fontWeight: 'bold', marginLeft: 20 }}>
        FAVORITES
      </Typography>
      {favorites.length > 0 && !loading ? (<ItemListContainer products={favorites}></ItemListContainer>) : (
         <Typography sx={{ fontSize: 'h5.fontSize', padding: 2, marginLeft: 20 }}>
         There are not favorites added yet
       </Typography>
      )}
       {loading && <CircularProgress color="inherit" />}
    </div>
  );
  
}

export default FavoritesPage