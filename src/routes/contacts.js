import { Router } from 'express';

import * as contactController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactController.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.getContactsByIdController)
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.addContactController)
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.upsertContactController)
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactController.patchContactController)
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.deleteContactController)
);

export default contactsRouter;
