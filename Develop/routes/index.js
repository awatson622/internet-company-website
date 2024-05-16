const router = require('express').Router();
const apiRoutes = require('./api');  // Adjust path if needed

router.use('/api', apiRoutes);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = router;
