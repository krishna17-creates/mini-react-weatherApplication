import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./SearchBox.css";
import axios from 'axios';

export default function SearchBox({ updatedInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  // The ONLY URL we need now is our backend's URL
  const API_URL = "http://localhost:3001/api/get-weather";

  function handleChange(e) {
    setCity(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);

      // We only make ONE call to our secure backend now
      const response = await axios.post(API_URL, { city: city });

      // The response.data already contains EVERYTHING (weather + AI summary)
      updatedInfo(response.data);
      setCity("");

    } catch (err) {
      console.error(err);
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
          label="Enter Location"
          variant="standard"
          value={city}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={error}
          helperText={error ? "No such place exists!" : ""}
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