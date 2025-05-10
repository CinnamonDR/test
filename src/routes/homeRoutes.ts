import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

import { PaymentController } from '../../controllers/paymentController';
import { isAuthenticated } from '../../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res) => {
  res.render('pages/index'); 
});

router.get('/servicios', (req, res) => {
  res.render('pages/servicios'); 
});

router.get('/pago', isAuthenticated, (req: Request, res: Response) => {
  res.render('pages/pago'); 
});

router.get('/register', isAuthenticated, (req: Request, res: Response) => {
  res.render('pages/register'); 
});


router.get('/forgot-password', (req, res) => {
  res.render('pages/forgot-password');
});

router.get('/reset-password-password', (req, res) => {
  res.render('pages/reset-password');
});

// Nueva ruta POST para procesar el pago
const paymentController = new PaymentController();
router.post('/pago/procesar', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  paymentController.processPayment(req, res, next as NextFunction);
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});



router.get('/contactos', (req: Request, res: Response) => {
  res.render('pages/contactos');
});

router.get('/pago/confirmacion', (req, res) => {
  res.render('pages/pago/confirmacion');
});

router.get('/pago/error', (req, res) => {
  res.render('pages/pago/error');
});


export default router;
