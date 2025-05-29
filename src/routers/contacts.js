import express from 'express';
import { contactsController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactSchema.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Apply ID validation middleware to all routes that use id
router.use('/:id', isValidId);

// GET /contacts with pagination, sorting, and filtering
router.get('/', contactsController.getAllContacts);

// GET single contact
router.get('/:id', contactsController.getContactById);

// POST new contact with validation and file upload
router.post('/', upload.single('photo'), validateBody(createContactSchema), contactsController.createContact);

// PUT contact with validation and file upload
router.put('/:id', upload.single('photo'), validateBody(updateContactSchema), contactsController.updateContact);

// DELETE contact
router.delete('/:id', contactsController.deleteContact);

export default router;
