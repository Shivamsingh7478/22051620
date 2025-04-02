const app = require('./app');
const { WINDOW_SIZE } = require('./config/constants');
const PORT = process.env.PORT || 9876;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Window size: ${WINDOW_SIZE}`);
  console.log('Available endpoints:');
  console.log('GET /numbers/p - Prime numbers');
  console.log('GET /numbers/f - Fibonacci numbers');
  console.log('GET /numbers/e - Even numbers');
  console.log('GET /numbers/r - Random numbers');
});