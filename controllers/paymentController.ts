import { Request, Response, NextFunction } from 'express';

export class PaymentController {
  public async add(req: Request, res: Response): Promise<void> {
    // Por ahora, simplemente enviar un mensaje de confirmación
    res.send('Pago realizado');
  }

  public async processPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('Datos de pago recibidos:', req.body);
    // Simular un 20% de probabilidad de error
    const simulatedError = Math.random() < 0.2;

    if (simulatedError) {
      res.redirect('/pago/error');
    } else {
      res.redirect('/pago/confirmacion');
    }
  }

}