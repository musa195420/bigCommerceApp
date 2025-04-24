const express = require('express');
const bodyParser = require('body-parser');
const taxRoutes = require('./routes/router'); // <-- fixed path
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/tax', taxRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Tax Provider App running on port ${PORT}`);
});
