export const mockHistoricalData = {
  dates: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  }),
  prices: Array.from({ length: 30 }, (_, i) => {
    const basePrice = 45000;
    const randomFactor = Math.sin(i * 0.2) * 2000 + Math.random() * 1000;
    return basePrice + randomFactor;
  })
};

export const mockPrediction = {
  nextDayPrice: 46750.25,
  upProbability: 65,
  downProbability: 35,
  predictedTrend: [
    { date: '2024-03-20', price: 46750.25 },
    { date: '2024-03-21', price: 47200.50 },
    { date: '2024-03-22', price: 47800.75 },
    { date: '2024-03-23', price: 48100.25 },
    { date: '2024-03-24', price: 47900.00 }
  ]
}; 