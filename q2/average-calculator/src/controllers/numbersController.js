const { processNumbers } = require('../services/numberService');

const getNumbers = async (req, res) => {
  try {
    const { numberid } = req.params;
    const result = await processNumbers(numberid);
    
    res.json({
      ...result,
      message: result.numbers.length > 0 
        ? 'Numbers processed successfully' 
        : 'No new numbers added (duplicates or timeout)'
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      windowPrevState: [],
      windowCurrState: [],
      numbers: [],
      avg: 0
    });
  }
};

module.exports = { getNumbers };