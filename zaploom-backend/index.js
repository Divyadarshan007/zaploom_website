/**
 * Application Entry Point
 * Starts the Express server and connects to MongoDB
 */

const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');
const mongoose = require('mongoose');

connectDB();

const PORT = env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${env.NODE_ENV}`);
  console.log(`🌐 API: http://localhost:${PORT}${env.API_BASE_PATH}`);
});

server.timeout = 30000;
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down...`);
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(false).then(() => {
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    }).catch((err) => {
      console.error('Mongo close error:', err);
      process.exit(1);
    });
  });
  setTimeout(() => {
    console.error('❌ Forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  if (env.NODE_ENV !== 'production') process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});
