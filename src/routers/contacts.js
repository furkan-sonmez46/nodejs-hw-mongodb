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
import { authenticate } from '../middlewares/authenticate.js';
import { checkContactUser } from '../middlewares/checkContactUser.js';

import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);
router.get('/', checkContactUser, ctrlWrapper(getAllContactsController));
router.get(
  '/:contactId',
  isValidId,
  checkContactUser,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/register',
  isValidId,
  checkContactUser,
  upload.single('photo'),
  validateBody(contactCreateShema),
  ctrlWrapper(createContactController),
);
router.post(
  '/',
  checkContactUser,
  validateBody(contactCreateShema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  isValidId,
  checkContactUser,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  checkContactUser,
  upload.single('photo'),
  validateBody(contactUpdateShema),
  ctrlWrapper(updateContactController),
);

export default router;
