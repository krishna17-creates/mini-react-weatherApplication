import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import "./infobox.css";

export default function infobox({info}) {
  let imageurl =
    "https://images.unsplash.com/photo-1714417830767-79dc641c6e65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJva2VuJTIwY2xvdWRzfGVufDB8fDB8fHww";
  

  return (
    <div className="cardinfo">
      <div className="card">
        <Card sx={{ maxWidth: 370, width: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="160"
              image={imageurl}
              alt={info.description}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {info.city}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                component={"span"}
              >
                <p>Located in : {info.country}</p>
                <p>temperature : {info.temperature}</p>
                <p>Min temp : {info.tempMin}</p>
                <p>Max Temp : {info.tempMax}</p>
                <p>Humidity : {info.humidity}</p>
                <p>Weather can be described as <b>{info.description}</b></p>
                <p>
                  Actual temp is <i>{info.temperature} &nbsp; </i> but feels like{" "}
                  <b>{info.feelslike}</b>
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
