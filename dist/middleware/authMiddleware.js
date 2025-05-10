"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        // Usuario autenticado, continuar a la siguiente middleware/ruta
        next();
    }
    else {
        // Usuario no autenticado, redirigir al login
        res.redirect('/login');
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authMiddleware.js.map