// server/server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai'); 
require('dotenv').config();

const app = express();
const port = 3001;

//  Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

app.use(cors());
app.use(express.json());

app.post('/api/get-weather', async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({ error: 'City is required.' });
        }

        // Fetch weather data
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        const weatherResponse = await axios.get(weatherApiUrl);
        const weatherData = weatherResponse.data;

        const weatherInfo = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            tempMin: weatherData.main.temp_min,
            tempMax: weatherData.main.temp_max,
            feelslike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            description: weatherData.weather[0].description,
        };

        //  Prompt for a fun, clever travel tip
        const prompt = `
        You are a playful and witty travel assistant.
        The weather in ${weatherInfo.city}, ${weatherInfo.country} is ${weatherInfo.temperature}°C with ${weatherInfo.description} humidity ${weatherInfo.humidity}.
        Write one short, clever travel tip (family-safe, fun, and slightly teasing) tip should aim to who keeps the city as destination (travelling soon).
        Keep it under 3-4 sentences add emojis. Don't add introductions or extra formatting and  keep in simple words."
        `;

        //  AI summary fallback in case of failure
        let aiSummary = "Server is busy. Please try again later.";

        try {
            const result = await model.generateContent(prompt);
            aiSummary = result.response.text().trim();
        } catch (aiError) {
            console.error("⚠️ Gemini AI failed:", aiError.message);
            // Continue with fallback
        }

        //  Always send weather info
        const finalResponse = {
            ...weatherInfo,
            aiSummary,
        };

        res.json(finalResponse);

    } catch (error) {
        console.error('❌ Error in /api/get-weather:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'City not found.' });
        }

        res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
