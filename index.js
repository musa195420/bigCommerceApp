
const express = require('express');
const bodyParser = require('body-parser');
const taxRoutes = require('./routes/tax');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/tax', taxRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Tax Provider App running on port ${PORT}`);
});
