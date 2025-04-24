const validateEstimate = (req, res, next) => {
    const { destination_address, line_items } = req.body;
  
    if (!destination_address || typeof destination_address !== 'object') {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid destination_address'
      });
    }
  
    const requiredFields = ['address1', 'city', 'state_or_province', 'country_code', 'postal_code'];
    for (const field of requiredFields) {
      if (!destination_address[field]) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: `Missing field in destination_address: ${field}`
        });
      }
    }
  
    if (!Array.isArray(line_items) || line_items.length === 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'line_items must be a non-empty array'
      });
    }
  
    for (const item of line_items) {
      if (
        typeof item.price !== 'number' ||
        typeof item.quantity !== 'number'
      ) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Each line item must contain numeric price and quantity'
        });
      }
    }
  
    next();
  };
  
  module.exports = { validateEstimate };
  