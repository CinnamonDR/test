import { Router } from 'express';
import { ContactsController } from '../controllers/contactsController';

const router = Router();
const contactsController = new ContactsController();

router.post('/contact/add', contactsController.add);
router.get('/admin/contacts', contactsController.index);

export default router;