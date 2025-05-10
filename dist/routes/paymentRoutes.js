"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
const paymentController = new paymentController_1.PaymentController();
router.post('/payment/add', paymentController.add);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map