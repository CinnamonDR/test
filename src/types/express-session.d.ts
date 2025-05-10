import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number; // O un tipo más específico para tu objeto de usuario
  }
}