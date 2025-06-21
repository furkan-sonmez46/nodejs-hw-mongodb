import { ContactCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contacts = await ContactCollection.findById(contactId);
  return contacts;
};
export const createContact = async (contactData) => {
  const contact = await ContactCollection.create(contactData);
  return contact;
};
export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
export const updateContact = async (contactId, contactData, options = {}) => {
  const contact = await ContactCollection.findByIdAndUpdate(
    { _id: contactId },
    contactData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return contact;
};
