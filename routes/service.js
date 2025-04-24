const axios = require('axios');

const getTaxAmount = async (destination_address, line_items) => {
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

  const taxRate = parseFloat(response.data.estimated_combined_rate || "0");
  const taxAmount = line_items.reduce(
    (sum, item) => sum + (item.price * item.quantity * taxRate),
    0
  );

  return { taxRate, taxAmount };
};

module.exports = { getTaxAmount };
