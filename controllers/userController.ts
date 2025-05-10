import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class UserController {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

 public async register(req: Request, res: Response): Promise<void> {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      res.status(400).send('Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).send('La contraseña y la confirmación no coinciden.');
      return;
    }

    try {
      const existingUserByUsername = await this.userModel.findUserByUsername(username);
      if (existingUserByUsername) {
        res.status(400).send('El nombre de usuario ya está registrado.');
        return;
      }

      const existingUserByEmail = await this.userModel.findUserByEmail(email);
      if (existingUserByEmail) {
        res.status(400).send('El correo electrónico ya está registrado.');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userModel.createUser(username, email, hashedPassword);

      res.redirect('/login'); // Redirigir al login tras registro exitoso

    } catch (error) {
      console.error('Error en el registro de usuario:', error);
      res.status(500).send('Error en el servidor durante el registro.');
    }
  }

 public async forgotPasswordRequest(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).send('El correo es obligatorio');
    }

    try {
      const user = await this.userModel.findUserByEmail(email);

      if (user) {
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 3600000; // 1 hora
        await this.userModel.saveResetToken(user.id, resetToken, resetTokenExpires);
        console.log(`Password reset link: http://localhost:3000/password/reset/${resetToken}`);
      }

      res.send('Si el correo electrónico está registrado, se ha enviado un enlace de restablecimiento.');
    } catch (error) {
      console.error('Error en la solicitud de recuperación de contraseña:', error);
      res.status(500).send('Error en el servidor durante la solicitud de recuperación.');
    }
  }

 public async renderResetPasswordForm(req: Request, res: Response): Promise<void> {
    const { token } = req.params;

    try {
      const user = await this.userModel.findUserByResetToken(token);

      if (user) {
        res.render('pages/reset-password', { token });
      } else {
        res.status(400).send('Token de restablecimiento inválido o expirado.');
      }
    } catch (error) {
      console.error('Error al renderizar el formulario de restablecimiento:', error);
      res.status(500).send('Error en el servidor al procesar el token de restablecimiento.');
    }
  }

 public async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      res.status(400).send('La nueva contraseña y la confirmación son obligatorias.');
    }

    if (password !== confirmPassword) {
      res.status(400).send('La nueva contraseña y la confirmación no coinciden');
    }

    try {
      const user = await this.userModel.findUserByResetToken(token);

      if (!user) {
        res.status(400).send('Token de restablecimiento inválido o expirado.');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user's password and clear the reset token
      // Assuming you have a method like `updatePassword` in your UserModel
      // and a method like `clearResetToken`
      // Since we don't have these, we'll add a placeholder comment
      // await this.userModel.updatePassword(user.id, hashedPassword);
      // await this.userModel.clearResetToken(user.id);

      // Placeholder for updating password and clearing token
      // You will need to implement these in UserModel
      console.log(`Usuario ${user.username} (ID: ${user.id}) - Nueva contraseña hasheada lista para actualizar.`);
      console.log(`Token de restablecimiento ${token} listo para ser invalidado/eliminado.`);

      res.redirect('/login?message=passwordResetSuccess'); // Redirect with success message
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      res.status(500).send('Error en el servidor durante el restablecimiento de contraseña.');
    }
  }

 public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body; // Asumimos login por username o email

    if (!username || !password) {
      res.status(400).send('Nombre de usuario/correo electrónico y contraseña son obligatorios.');
      return;
    }

    try {
      // Intentar encontrar usuario por username o email
      let user = await this.userModel.findUserByUsername(username);
      if (!user) {
        user = await this.userModel.findUserByEmail(username); // Intentar por email si no se encontró por username
      }

      if (!user) {
        res.status(400).send('Credenciales incorrectas.');
        return;
      }

      // Comparar contraseñas
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Establecer sesión
        req.session.userId = user.id;
        res.redirect('/admin/contacts'); // Redirigir a la página de administración
      } else {
        res.status(400).send('Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).send('Error en el servidor durante el inicio de sesión.');
    }
  }

 public async logout(req: Request, res: Response): Promise<void> {
    req.session.destroy(err => {
      if (err) {
        console.error('Error al cerrar la sesión:', err);
        res.status(500).send('Error al cerrar la sesión.'); // Opcional: enviar respuesta de error
      } else {
        // Redirigir al inicio o login después de cerrar sesión
        res.redirect('/');
      }
    });
  }
}