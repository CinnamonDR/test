import { Request, Response } from 'express';

export const index = (req: Request, res: Response) => {
  res.render('pages/index');
};

export const servicios = (req: Request, res: Response) => {
  res.render('pages/servicios');
};

export const pago = (req: Request, res: Response) => {
  res.render('pages/pago');
};

export const login = (req: Request, res: Response) => {
  res.render('pages/login');
};

export const contactos = (req: Request, res: Response) => {
  res.render('pages/contactos');
};

export const forgotpassword = (req: Request, res: Response) => {
  res.render('pages/forgot-password');
};

