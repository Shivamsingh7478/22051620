const { WINDOW_SIZE } = require('../config/constants');

class WindowService {
  constructor() {
    this.window = [];
    this.uniqueNumbers = new Set();
  }

  addNumbers(newNumbers) {
    const prevState = [...this.window];
    const uniqueNewNumbers = [...new Set(newNumbers)].filter(n => !this.uniqueNumbers.has(n));
    
    for (const num of uniqueNewNumbers) {
      if (this.window.length >= WINDOW_SIZE) {
        const removed = this.window.shift();
        this.uniqueNumbers.delete(removed);
      }
      this.window.push(num);
      this.uniqueNumbers.add(num);
    }

    return {
      prevState,
      currState: [...this.window],
      addedNumbers: uniqueNewNumbers
    };
  }

  getAverage() {
    if (this.window.length === 0) return 0;
    const sum = this.window.reduce((acc, num) => acc + num, 0);
    return parseFloat((sum / this.window.length).toFixed(2));
  }

  getCurrentState() {
    return [...this.window];
  }
}

module.exports = WindowService;