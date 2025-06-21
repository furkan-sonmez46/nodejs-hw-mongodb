import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const initStart = async () => {
  try {
    await initMongoConnection();
    setupServer();
    console.log('MongoDB connection initialized successfully');
  } catch (error) {
    console.error('Failed to initialize MongoDB connection:', error);
  }
};

initStart();
