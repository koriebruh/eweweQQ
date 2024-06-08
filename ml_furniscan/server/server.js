require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      status: 'fail',
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
