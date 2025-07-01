import { ContactCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactQuery = ContactCollection.find();
  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  // const contactCount = await ContactCollection.find()
  //   .merge(contactQuery)
  //   .countDocuments();
  // const contacts = await contactQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
  const [contactCount, contacts] = await Promise.all([
    ContactCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
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
