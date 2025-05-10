"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../../controllers/paymentController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.render('pages/index');
});
router.get('/servicios', (req, res) => {
    res.render('pages/servicios');
});
router.get('/pago', authMiddleware_1.isAuthenticated, (req, res) => {
    res.render('pages/pago');
});
router.get('/register', authMiddleware_1.isAuthenticated, (req, res) => {
    res.render('pages/register');
});
router.get('/forgot-password', (req, res) => {
    res.render('pages/forgot-password');
});
router.get('/reset-password-password', (req, res) => {
    res.render('pages/reset-password');
});
// Nueva ruta POST para procesar el pago
const paymentController = new paymentController_1.PaymentController();
router.post('/pago/procesar', authMiddleware_1.isAuthenticated, (req, res, next) => {
    paymentController.processPayment(req, res, next);
});
router.get('/login', (req, res) => {
    res.render('pages/login');
});
router.get('/contactos', (req, res) => {
    res.render('pages/contactos');
});
router.get('/pago/confirmacion', (req, res) => {
    res.render('pages/pago/confirmacion');
});
router.get('/pago/error', (req, res) => {
    res.render('pages/pago/error');
});
exports.default = router;
//# sourceMappingURL=homeRoutes.js.map