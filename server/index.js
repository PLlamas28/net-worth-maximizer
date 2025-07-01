const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', require('./routes/dataRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
