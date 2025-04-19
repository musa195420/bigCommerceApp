const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/estimate', async (req, res) => {
  try {
    const { destination_address, line_items } = req.body;

    const addressData = {
      address1: destination_address.address1,
      address2: destination_address.address2,
      city: destination_address.city,
      state: destination_address.state_or_province,
      country: destination_address.country_code,
      zip_code: destination_address.postal_code
    };

    const response = await axios.post(
      'https://taxify-backend-fee6ezd7czb5fsag.westus-01.azurewebsites.net/api/v1/tax-rate/',
      addressData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY
        }
      }
    );

    // ✅ Pull correct rate (as string) and convert to number
    const taxRate = parseFloat(response.data.estimated_combined_rate || "0");
    const taxAmount = line_items.reduce(
      (sum, item) => sum + (item.price * item.quantity * taxRate),
      0
    );

    return res.json({
      taxes: [
        {
          name: `Custom Tax (${(taxRate * 100).toFixed(2)}%)`,
          amount: parseFloat(taxAmount.toFixed(2))
        }
      ]
    });
  } catch (error) {
    console.error('Tax calculation failed:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Tax calculation failed' });
  }
});

module.exports = router;
