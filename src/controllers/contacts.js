import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';


export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id: ${id}!`,
    data: contact,
  });
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
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactData = req.body;
  const contact = await updateContact(contactId, contactData);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
      status: 200,
      message: "Successfully patched a contact!",
      data: contact,
  });
};

