"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Aplicar middleware de autenticación a todas las rutas definidas en este router
router.use(authMiddleware_1.isAuthenticated);
router.get('/', (req, res) => {
    res.render('pages/admin/dashboard');
});
// Puedes agregar más rutas de administración aquí
// router.get('/users', (req, res) => { /* ... */ });
// router.get('/products', (req, res) => { /* ... */ });
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map