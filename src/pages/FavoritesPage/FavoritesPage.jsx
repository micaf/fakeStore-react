import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import './FavoritesPage.css'
function FavoritesPage() {
  return (
    <>
      <div className="favorite-container">
        <Card sx={{ maxWidth: 400, margin: 10, padding: 10 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                CONTACT
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
               This is a Fake Store
              </Typography>
            </CardContent>
        </Card>
      </div>

    </>
  )
}

export default FavoritesPage