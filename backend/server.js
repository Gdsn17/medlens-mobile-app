const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    mode: 'production'
  });
});

// Mock API endpoints for development
app.post('/api/query/upload', (req, res) => {
  res.json({
    success: true,
    queryId: 'mock-' + Date.now(),
    message: 'Image uploaded successfully (mock)'
  });
});

app.get('/api/query/history', (req, res) => {
  res.json({
    success: true,
    queries: [
      {
        id: 'mock-1',
        imageUrl: 'https://via.placeholder.com/300x200',
        result: 'Mock analysis result',
        timestamp: new Date().toISOString()
      }
    ]
  });
});

app.get('/api/user/profile', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'mock-user',
      name: 'Test User',
      email: 'test@medlens.com',
      tokens: 5,
      isPro: false
    }
  });
});

app.post('/api/upgrade/pro', (req, res) => {
  res.json({
    success: true,
    message: 'Upgraded to MedLens Pro (mock)',
    user: {
      id: 'mock-user',
      isPro: true,
      tokens: 100
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 MedLens Backend running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;