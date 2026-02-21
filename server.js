require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const mongoose = require('mongoose');

// Import routes
const referencesRoute = require('./routes/referencesRoute');
const projectsRoute = require('./routes/projectsRoute');
const servicesRoute = require('./routes/servicesRoute');
const usersRoute = require('./routes/usersRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/references', referencesRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/services', servicesRoute);
app.use('/api/users', usersRoute);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });