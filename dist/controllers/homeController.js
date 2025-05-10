"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactos = exports.login = exports.pago = exports.servicios = exports.index = void 0;
const index = (req, res) => {
    res.render('pages/index');
};
exports.index = index;
const servicios = (req, res) => {
    res.render('pages/servicios');
};
exports.servicios = servicios;
const pago = (req, res) => {
    res.render('pages/pago');
};
exports.pago = pago;
const login = (req, res) => {
    res.render('pages/login');
};


exports.login = login;
const contactos = (req, res) => {
    res.render('pages/contactos');
};
exports.contactos = contactos;



const forgotpassword = (req, res) => {
    res.render('page/forgot-password');
};
exports.forgotpassword = forgotpassword;