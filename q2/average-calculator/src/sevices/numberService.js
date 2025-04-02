const { fetchNumbers } = require('../utils/api');
const { NUMBER_TYPES } = require('../config/constants');
const WindowService = require('./windowService');

const windowServices = {
  [NUMBER_TYPES.PRIME]: new WindowService(),
  [NUMBER_TYPES.FIBONACCI]: new WindowService(),
  [NUMBER_TYPES.EVEN]: new WindowService(),
  [NUMBER_TYPES.RANDOM]: new WindowService()
};

const getNumberTypeEndpoint = (type) => {
  const normalizedType = type.toLowerCase();
  if (!Object.values(NUMBER_TYPES).includes(normalizedType)) {
    throw new Error('Invalid number type');
  }
  return normalizedType;
};

const processNumbers = async (type) => {
  const validType = getNumberTypeEndpoint(type);
  const numbers = await fetchNumbers(validType);
  const windowService = windowServices[validType];
  
  const { prevState, currState, addedNumbers } = windowService.addNumbers(numbers);
  const avg = windowService.getAverage();

  return {
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: addedNumbers,
    avg
  };
};

module.exports = { processNumbers };