import { Router } from 'express';
import { isAuthenticated } from '../../middleware/authMiddleware';
import { Request, Response } from 'express';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas definidas en este router
router.use(isAuthenticated);

router.get('/', (req: Request, res: Response) => {
  res.render('pages/admin/dashboard');
});

// Puedes agregar más rutas de administración aquí
// router.get('/users', (req, res) => { /* ... */ });
// router.get('/products', (req, res) => { /* ... */ });

export default router;