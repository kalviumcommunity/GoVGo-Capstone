const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./Routes/authroutes.js');
const userRoutes = require('./Routes/userroutes.js');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


  app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);  

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port:http://localhost:${PORT}`));
