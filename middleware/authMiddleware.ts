import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && (req.session as any).userId) {
    // Usuario autenticado, continuar a la siguiente middleware/ruta
    next();
  } else {
    // Usuario no autenticado, redirigir al login
    res.redirect('/login');
  }
};