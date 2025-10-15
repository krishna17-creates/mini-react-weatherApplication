import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SunnyIcon from '@mui/icons-material/Sunny';
import "./infobox.css";

export default function infobox({ info }) {
  let imageurl =
    "https://images.unsplash.com/photo-1714417830767-79dc641c6e65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJva2VuJTIwY2xvdWRzfGVufDB8fDB8fHww";

  let HOT_URL =
    "https://images.unsplash.com/photo-1561473880-3b8b12de0a71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
  let COLD_URL =
    "https://images.unsplash.com/photo-1612119276551-be9efb8ea36a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHww";
  let RAINY_URL =
    "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFpbnklMjB3ZWF0aGVyfGVufDB8fDB8fHww";

  return (
    <div className="cardinfo">
      <div className="card">
        <Card sx={{ maxWidth: 500, width: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="160"
              image={
                info.humidity > 80
                  ? RAINY_URL
                  : info.temperature > 25
                  ? HOT_URL
                  : COLD_URL
              }
              alt={info.description}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {info.city}&nbsp;
                {
                info.humidity > 80
                  ? <BeachAccessIcon/>
                  : info.temperature > 25
                  ? <SunnyIcon/>
                  : <AcUnitIcon/>
              }
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                component={"span"}
              >
                <p>Country : {info.country}</p>
                <p>temperature : {info.temperature}</p>
                <p>Min temp : {info.tempMin}</p>
                <p>Max Temp : {info.tempMax}</p>
                <p>Humidity : {info.humidity}</p>
                <p>
                  Weather can be described as <b>{info.description}</b>
                </p>
                <p>
                  Actual temp is <i>{info.temperature} &nbsp; </i> but feels
                  like <b>{info.feelslike}</b>
                </p>
                <p style={{ color: "red" }}>
                  *These values may not be accurate
                </p>
                <div className="travelTipBox">
                  <p><b>Small AI Tip</b></p>
                  <p><i>{info.aiSummary}</i></p>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
