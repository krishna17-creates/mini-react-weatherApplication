import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./SearchBox.css"


export default function SearchBox({updatededReport}) {
  let [city, setcity] = useState("");
//    this api was taken from 
//    https://openweathermap.org/current
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
    const API_KEY = "1effaee869039e6af440713fad1a875c";
    let api_request = `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
// metric is used so that all the data will be degree or in convinicence to understand
    let getWeatherinfo = async () =>{
        let response = await fetch(
            api_request
        );
    let jsonResponse = await response.json();
    // console.log(jsonResponse)

        let resultRes ={
            city: {city},
            temperature: jsonResponse.main.temp,
            tempMin : jsonResponse.main.temp_min,
            tempMax : jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like,
            country:jsonResponse.sys.country,
            description:jsonResponse.weather[0].description
        }
        console.log(resultRes)
        return resultRes
    }

  function handlechange(e) {
    setcity(e.target.value);
  }

  function  handlesubmit(e){
    e.preventDefault();
    setcity("");
   let info = await getWeatherinfo();
   updatededReport(info);
  }


  return (
    <div className="searchbox">
      <h1>searh component</h1>
      <form onSubmit={handlesubmit}>
        <TextField
          id="cityname"
          label="Enter City"
          variant="standard"
          value={city}
          onChange={handlechange}
          required
        />
        <br />
        <br />
        <Button variant="outlined" type="submit">
          Search{" "}
        </Button>
      </form>
    </div>
  );
}
