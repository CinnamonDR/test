"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.render('pages/index');
});
router.get('/servicios', (req, res) => {
    res.render('pages/servicios');
});
router.get('/pago', (req, res) => {
    res.render('pages/pago');
});
router.get('/login', (req, res) => {
    res.render('pages/login');
});
router.get('/contactos', (req, res) => {
    res.render('pages/contactos');
});
router.get('/forgot-password', (req, res) => {
    res.render('pages/forgot-password');
});

exports.default = router;
//# sourceMappingURL=homeRoutes.js.map