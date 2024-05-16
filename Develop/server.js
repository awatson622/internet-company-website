const express = require('express');
const app = express();
const router = require('./routes');  // Correctly requiring the routes module

app.use(express.json()); // Middleware to parse JSON bodies
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
