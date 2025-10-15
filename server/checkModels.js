// server/checkModels.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Fetching available models for your API key...");
    const modelInfo = await genAI.listModels();

    console.log("--- Models supporting 'generateContent' ---");
    for await (const m of modelInfo) {
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(m.name);
      }
    }
    console.log("-----------------------------------------");
    console.log("Use one of the model names listed above in your server.js file.");

  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();