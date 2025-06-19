import { ContactCollection } from '../db/models/Contact.js ';

export const getAllcontacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contacts = await ContactCollection.findById(contactId);
  return contacts;
};
