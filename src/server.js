const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

dotenv.config(); // set up env biar bisa dipake

const app = express(); // initialisasi expressjs

// Swagger
// Api Documentation
const apiDocumentation = require('./apiDocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

const PORT = process.env.PORT; // ambil value port dari .env

app.use(cors());
app.use(express.json());

// test server
app.get('/', (req, res) => {
  res.send('Halo server jalan');
});

// Handle routes users
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Handle routes category
const categoryRoutes = require('./routes/category');
app.use('/category', categoryRoutes);

// Handle routes product
const productRoutes = require('./routes/product');
app.use('/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());
