import {
  getAllContacts,
  getContactById,
  createContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { updateContact } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
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
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id: ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res) => {
  const contactData = req.body;
  const contact = await createContact(contactData);
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contactData = req.body;
  const contact = await updateContact(contactId, contactData);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully updated contact with id: ${contactId}!`,
    data: contact,
  });
};
