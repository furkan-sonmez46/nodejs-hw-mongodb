import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (contactData) => {
  const contact = await ContactsCollection.create(contactData);
  return contact;
};

export const updateContact = async (contactId, contactData, options = {}) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId },
    contactData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return updatedContact;
};

export const deleteContact = async ({ _id: contactId }) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  return deletedContact;
};
