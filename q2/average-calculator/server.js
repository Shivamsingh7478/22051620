import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT_MS = 500;

// Map number types to their respective API endpoints
const API_ENDPOINTS = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand'
};

// Storage for each number type's window
const numberWindows = {
  p: [],
  f: [],
  e: [],
  r: []
};

// Helper function to fetch numbers from the test server
async function fetchNumbers(type) {
  try {
    const response = await axios.get(API_ENDPOINTS[type], { timeout: TIMEOUT_MS });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return [];
  }
}

// Helper function to update window with new numbers
function updateWindow(window, newNumbers) {
  const prevState = [...window];
  const uniqueNewNumbers = [];
  const seen = new Set(window);

  for (const num of newNumbers) {
    if (!seen.has(num)) {
      seen.add(num);
      uniqueNewNumbers.push(num);
    }
  }

  // Add new unique numbers to the window
  const updatedWindow = [...window, ...uniqueNewNumbers];

  // If window exceeds size, remove oldest numbers
  if (updatedWindow.length > WINDOW_SIZE) {
    updatedWindow.splice(0, updatedWindow.length - WINDOW_SIZE);
  }

  return {
    prevState,
    currState: updatedWindow,
    addedNumbers: uniqueNewNumbers
  };
}

// Calculate average of numbers in window
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
}

// Main endpoint
app.get('/numbers/:numberid', async (req, res) => {
  const type = req.params.numberid;
  
  // Validate type
  if (!API_ENDPOINTS[type]) {
    return res.status(400).json({
      error: 'Invalid number type. Use p (prime), f (Fibonacci), e (even), or r (random)',
      windowPrevState: [],
      windowCurrState: [],
      numbers: [],
      avg: 0
    });
  }

  // Fetch numbers from test server
  const newNumbers = await fetchNumbers(type);
  
  // Update window with new numbers
  const { prevState, currState, addedNumbers } = updateWindow(numberWindows[type], newNumbers);
  numberWindows[type] = currState;
  
  // Calculate average
  const avg = calculateAverage(currState);

  // Prepare response
  const response = {
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: addedNumbers,
    avg: avg
  };

  res.json(response);
});

// Start serve

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});