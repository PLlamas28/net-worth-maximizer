const express = require('express');
const router = express.Router();

const rates = new Map();
rates.set("per hour", 2000) // assume 2000 hours per year with typical American holidays
rates.set("per day", 250)
rates.set("per week", 50) // take off 2 weeks for holidays
rates.set("per month", 12)
rates.set("per year", 1)
rates.set("per nothing", 0)

let income = 0;
let expenses = 0;
let savings = 0;

// Define
router.post('/', (req, res) => {
  const { numInputs, selInputs } = req.body;

  for (let i = 0; i < 9; i++){
    if (i < 3){
      income += numInputs[i] * rates.get(selInputs[i])
    }
    else if (i < 6) {
      expenses += numInputs[i] * rates.get(selInputs[i])
    } else if (i < 9) {
      savings += numInputs[i]
    } else {
      savings += numInputs[8] * (1+numInputs[9]/100)
    }
  }

  const chartData = {
    // labels: form1Data.map((_, i) => `Point ${i + 1}`),
    // datasets: [
    //   { label: 'Form 1', data: form1Data },
    //   { label: 'Form 2', data: form2Data },
    // ],
    data: [income, expenses, savings]
  };

  res.json(chartData);
});

module.exports = router;
