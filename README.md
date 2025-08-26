# React Weather App

This is a simple weather application built with React that allows users to search for the current weather conditions of any city. It displays information such as temperature, humidity, and a brief description of the weather.

## Live Demo

[View Live Demo](https://getweather-a.netlify.app/)

## Features

- Search for weather by city name.
- Display current temperature, min/max temperatures, and humidity.
- Shows a brief description of the weather (e.g., "broken clouds", "haze").
- User-friendly interface with Material-UI components.

## Tech Stack

- **Frontend:** [React.js](https://reactjs.org/)
- **UI Library:** [Material-UI](https://mui.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)

## Project Structure

The main components of the application are:

-   `src/`: Contains all the source code.
    -   `App.jsx`: The root component that renders the `WeatherApp`.
    -   `WeatherApp.jsx`: The main container component that holds the application state and logic.
    -   `SearchBox.jsx`: A component with a text field and a search button for users to enter a city name.
    -   `infoBox.jsx`: A component that displays the weather information in a card format.
    -   `App.css` & `index.css`: CSS files for styling.

## Code Flow

The application's data flow is unidirectional, which is a core principle of React.

1.  **`main.jsx`**: The entry point of the application which renders the `<App />` component into the DOM.
2.  **`App.jsx`**: This component simply renders the `<WeatherApp />` component.
3.  **`WeatherApp.jsx`**:
    -   This is the core component of the application.
    -   It uses the `useState` hook to manage the `weatherInfo` state, which holds the weather data for the displayed city.
    -   It renders the `<SearchBox />` and `<Infobox />` components.
    -   It passes a callback function (`updateInfo`) to the `<SearchBox />` component. This function is used to update the `weatherInfo` state with new data fetched from the weather API.
    -   It passes the `weatherInfo` state object as a prop to the `<Infobox />` component, which then displays the data.
4.  **`SearchBox.jsx`**:
    -   This component is responsible for handling user input.
    -   It contains a form with a `TextField` and a `Button` from Material-UI.
    -   When the user submits the form, it makes an API call to a weather service (like OpenWeatherMap) with the city name.
    -   Upon receiving a successful response, it calls the `updateInfo` function (received via props from `WeatherApp`) to lift the state up with the new weather data.
    -   It also handles potential errors during the API call.
5.  **`Infobox.jsx`**:
    -   This is a presentational component.
    -   It receives the `info` prop (the weather data) from `WeatherApp.jsx`.
    -   It uses Material-UI's `Card` component to display the weather information in a structured and visually appealing way.

## How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd react-mini-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).