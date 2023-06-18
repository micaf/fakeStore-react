import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function ContactPage() {
  return (
    <>
      <div className="contact-container">
        <Card sx={{ maxWidth: 400, margin: 10, padding: 10 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                CONTACT
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Lorem ipsum dolor sit amet. Non exercitationem illo ut explicabo accusamus nam veritatis omnis in molestias sunt At ducimus repellendus? Qui exercitationem galisum et placeat eveniet et dolor vitae ut itaque culpa.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

    </>
  )
}

export default ContactPage