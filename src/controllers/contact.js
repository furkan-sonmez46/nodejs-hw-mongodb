import { getAllContacts, getContactById } from '../services/contacts.js';

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
};
