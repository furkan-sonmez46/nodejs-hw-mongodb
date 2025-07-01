import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  contactCreateShema,
  contactUpdateShema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
const router = Router();
router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(contactCreateShema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(contactUpdateShema),
  ctrlWrapper(updateContactController),
);

export default router;
