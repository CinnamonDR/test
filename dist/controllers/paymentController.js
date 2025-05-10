"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
class PaymentController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Por ahora, simplemente enviar un mensaje de confirmación
            res.send('Pago realizado');
        });
    }
    processPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Datos de pago recibidos:', req.body);
            // Simular un 20% de probabilidad de error
            const simulatedError = Math.random() < 0.2;
            if (simulatedError) {
                res.redirect('/pago/error');
            }
            else {
                res.redirect('/pago/confirmacion');
            }
        });
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=paymentController.js.map