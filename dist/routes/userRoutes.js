"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
router.post('/register/add', userController.register);
// Agrega esta ruta para renderizar la página de olvido de contraseña
router.get('/forgot-password', (req, res) => {
    res.render('pages/forgot-password');
});
router.post('/password/forgot-request', userController.forgotPasswordRequest);
router.get('/password/reset/:token', userController.renderResetPasswordForm);
router.post('/password/reset', userController.resetPassword);
router.post('/auth/login', userController.login);
router.get('/logout', userController.logout);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map