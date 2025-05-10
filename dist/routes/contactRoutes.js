"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactsController_1 = require("../controllers/contactsController");
const router = (0, express_1.Router)();
const contactsController = new contactsController_1.ContactsController();
router.post('/contact/add', contactsController.add);
router.get('/admin/contacts', contactsController.index);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map