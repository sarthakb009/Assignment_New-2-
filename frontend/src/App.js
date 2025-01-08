import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function App() {
    const [predictions, setPredictions] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await axios.post('http://localhost:5002/api/predict', {
                    symbol: 'BTCUSDT'
                });
                setPredictions(response.data);
                const historicalPrices = response.data.map((item, index) => ({
                    date: `Prediction ${index + 1}`,
                    price: item.predictedPrice,
                    probability: item.probability
                }));
                setHistoricalData(historicalPrices);
            } catch (error) {
                console.error('Error fetching predictions:', error);
            }
        };

        fetchPredictions();
    }, []);

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#333',
        borderBottom: '2px solid #ddd',
        paddingBottom: '15px',
        marginBottom: '30px'
    };

    const chartContainerStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    };

    const predictionsContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px'
    };

    const predictionCardStyle = {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Cryptocurrency Price Predictions</h1>
            
            <div style={chartContainerStyle}>
                <h2 style={{marginBottom: '20px', color: '#444'}}>Price Trend Analysis</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date" 
                            tick={{fill: '#666'}}
                            padding={{ left: 30, right: 30 }}
                        />
                        <YAxis 
                            tick={{fill: '#666'}}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#2196f3" 
                            strokeWidth={2}
                            dot={{ fill: '#2196f3', strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h2 style={{color: '#444', marginLeft: '20px'}}>Detailed Predictions</h2>
            <div style={predictionsContainerStyle}>
                {predictions.map((prediction, index) => (
                    <div 
                        key={index} 
                        style={predictionCardStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <h3 style={{margin: '0 0 10px 0', color: '#2196f3'}}>
                            Prediction {index + 1}
                        </h3>
                        <p style={{margin: '5px 0', color: '#666'}}>
                            <strong>Price:</strong> ${prediction.predictedPrice.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>
                        <p style={{margin: '5px 0', color: '#666'}}>
                            <strong>Probability:</strong> {(prediction.probability * 100).toFixed(2)}%
                        </p>
                        <div 
                            style={{
                                width: '100%',
                                height: '4px',
                                backgroundColor: '#e0e0e0',
                                borderRadius: '2px',
                                marginTop: '10px'
                            }}
                        >
                            <div 
                                style={{
                                    width: `${prediction.probability * 100}%`,
                                    height: '100%',
                                    backgroundColor: '#2196f3',
                                    borderRadius: '2px',
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
