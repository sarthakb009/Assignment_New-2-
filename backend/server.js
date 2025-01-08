const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5002;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Function to fetch historical price data from Binance
async function fetchHistoricalData(symbol) {
    const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=30`);
    return response.data.map(data => ({
        time: data[0],
        open: parseFloat(data[1]),
        high: parseFloat(data[2]),
        low: parseFloat(data[3]),
        close: parseFloat(data[4]),
    }));
}

// Mock prediction function (replace with your AI model)
function predictPrices(data) {
    // Here you would implement your AI model logic
    return data.map(d => ({
        predictedPrice: d.close * 1.05, // Example prediction logic
        probability: Math.random() // Example probability
    }));
}

// Prediction endpoint
app.post('/api/predict', async (req, res) => {
    const { symbol } = req.body;
    try {
        const historicalData = await fetchHistoricalData(symbol);
        const predictions = predictPrices(historicalData);
        res.json(predictions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 