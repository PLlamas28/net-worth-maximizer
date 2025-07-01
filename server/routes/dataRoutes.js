const express = require('express');
const router = express.Router();


// Define
router.post('/', (req, res) => {
  const { form1Data, form2Data } = req.body;

  const chartData = {
    labels: form1Data.map((_, i) => `Point ${i + 1}`),
    datasets: [
      { label: 'Form 1', data: form1Data },
      { label: 'Form 2', data: form2Data },
    ],
  };

  res.json(chartData);
});

module.exports = router;
