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
exports.ContactsController = void 0;
const contactsModel_1 = require("../models/contactsModel");
class ContactsController {
    constructor() {
        this.contactsModel = new contactsModel_1.ContactsModel();
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, comment } = req.body;
            if (!name || !email || !comment) {
                res.status(400).send('Faltan campos obligatorios.');
                return;
            }
            const ip = req.ip;
            const timestamp = new Date().toISOString();
            try {
                yield this.contactsModel.addContact(name, email, comment, ip || 'N/A', timestamp);
                // Redirigir a una página de éxito o a la página principal
                res.redirect('/'); // O res.render('pages/success', { message: 'Mensaje enviado con éxito!' });
            }
            catch (error) {
                console.error('Error al guardar el contacto:', error);
                res.status(500).send('Error al guardar el contacto.');
            }
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield this.contactsModel.getAllContacts();
                res.render('pages/admin/contacts', { contacts });
            }
            catch (error) {
                console.error('Error al obtener los contactos:', error);
                res.status(500).send('Error al obtener los contactos.');
            }
        });
    }
}
exports.ContactsController = ContactsController;
//# sourceMappingURL=contactsController.js.map