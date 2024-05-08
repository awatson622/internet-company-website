const express = require('express');
const routes = require('./index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routes defined in index.js
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});