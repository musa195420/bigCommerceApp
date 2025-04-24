const { getTaxAmount } = require('./service');

const estimateTax = async (req, res) => {
  try {
    const { destination_address, line_items } = req.body;

    const taxData = await getTaxAmount(destination_address, line_items);

    res.status(200).json({
      taxes: [
        {
          name: `Custom Tax (${(taxData.taxRate * 100).toFixed(2)}%)`,
          amount: parseFloat(taxData.taxAmount.toFixed(2))
        }
      ]
    });
  } catch (error) {
    console.error('Tax calculation failed:', error.message);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Tax calculation failed',
      error: error.message
    });
  }
};

module.exports = { estimateTax };
