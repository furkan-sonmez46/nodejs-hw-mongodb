import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Contacts APP',
    });
  });
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
        res.json({
            status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
        res.json({
          status: 500,
          message: 'Error fetching contacts',
          error: error.message,
        });
    }
  });
  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id: ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }
      next(error);
    }
  });

  app.use((req, res, next) => {
      res.json({
    status: 404,
      message: 'Contact not found',
    });
  });

  app.use((err, req, res, next) => {
      res.json({
    status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
