import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const initStart = async () => {
  try {
    await initMongoConnection();
    startServer();
    console.log('MongoDB connection initialized successfully');
  } catch (error) {
    console.error('Failed to initialize MongoDB connection:', error);
  }
};

initStart();
