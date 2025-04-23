

require('dotenv').config();  // Make sure to load the .env file

const axios = require('axios');
const accessToken = process.env.ACCESS_TOKEN;  // Read the token from .env

async function summarizeText(text) {
  const data = JSON.stringify({
    "inputs": text, // Use the text passed into the function
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': accessToken  // Correct usage of the environment variable
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    // console.log("ACCESS TOKEN from .env:", accessToken);
    console.log('Hugging Face Response:', response.data); // Inspect the response to debug
    return response.data[0].summary_text; // Return the summary text from the response
  } catch (err) {
    console.error('Error summarizing text:', err.message);
    throw new Error('Failed to summarize the text');
  }
}

module.exports = summarizeText;
