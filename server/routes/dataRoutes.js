const express = require('express');
const router = express.Router();

let chartData = []

// Time conversion factors to monthly
const timeFactors = {
  'per nothing': 0,
  'per hour': 160, // ~40 hours/week * 4 weeks
  'per day': 30,
  'per week': 4.33,
  'per month': 1,
  'per year': 1/12
};

// Convert time-based values to monthly
const normalizeToMonthly = (value, timeUnit) => {
  return value * timeFactors[timeUnit];
};

// Get normalized monthly values
function createMonthlyData(values, timeUnits){
  const monthlyIncome = values.slice(0, 3).map((val, idx) => 
    normalizeToMonthly(val, timeUnits[idx])
  );
  const monthlyExpenses = values.slice(3, 6).map((val, idx) => 
    normalizeToMonthly(val, timeUnits[idx + 3])
  );
  const savings = values.slice(6, 9); // No time conversion needed
  const interestRate = values[9];

  const totalIncome = monthlyIncome.reduce((sum, val) => sum + val, 0);
  const totalExpenses = monthlyExpenses.reduce((sum, val) => sum + val, 0);
  const totalSavings = savings.reduce((sum, val) => sum + val, 0);

  return [
    monthlyIncome, 
    monthlyExpenses, 
    savings, 
    interestRate,
    totalIncome,
    totalExpenses,
    totalSavings
  ];
};

// Define
router.post('/', (req, res) => {
  const { values, timeUnits } = req.body;

  chartData = createMonthlyData(values, timeUnits)
  
  console.log(chartData)
  res.json({chartData});
});

router.get('/', (req, res) => {
  res.json({
    chartData
  })
})

module.exports = router;
