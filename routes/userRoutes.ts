import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/register/add', userController.register);

// Agrega esta ruta para renderizar la página de olvido de contraseña
router.get('/forgot-password', (req, res) => {
  res.render('pages/forgot-password');
});

router.post('/password/forgot-request', userController.forgotPasswordRequest);

router.get('/password/reset/:token', userController.renderResetPasswordForm);

router.post('/password/reset', userController.resetPassword);

router.post('/auth/login', userController.login);

router.get('/logout', userController.logout);

export default router;