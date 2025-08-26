import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./SearchBox.css";

export default function SearchBox({ updatedInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  //    this api was taken from
  //    https://openweathermap.org/current
  let [isLoading, setIsLoading] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = "1effaee869039e6af440713fad1a875c";

  // metric is used so that all the data will be degree or in convinicence to understand
  let getWeatherInfo = async () => {
    const api_request = `${API_URL}q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(api_request);
    let jsonResponse = await response.json();

    if (jsonResponse.cod === "404") {
      throw new Error("City not found");
    }

    let resultRes = {
      city: jsonResponse.name,
      temperature: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelslike: jsonResponse.main.feels_like,
      country: jsonResponse.sys.country,
      description: jsonResponse.weather[0].description,
    };
    console.log(resultRes)
    return resultRes;

  };

  function handleChange(e) {
    setCity(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      let info = await getWeatherInfo();
      updatedInfo(info);
      setCity("");
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="searchbox">
      <h2>Welcome To Weather Report by Krishna</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="cityname"
          label="Enter City"
          variant="standard"
          value={city}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={error}
          helperText={error ? "No such place exists! or There was no info about that city in our API" : ""}
        />
        <br />
        <br />
        <Button variant="outlined" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </form>
    </div>
  );
}
