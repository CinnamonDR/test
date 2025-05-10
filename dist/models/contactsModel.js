"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModel = void 0;
const sqlite3 = __importStar(require("sqlite3"));
class ContactsModel {
    constructor() {
        this.db = new sqlite3.Database('database.sqlite', (err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err.message);
            }
            else {
                console.log('Conectado a la base de datos SQLite.');
                this.createTable();
            }
        });
    }
    createTable() {
        const createTableSQL = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        comment TEXT,
        ip TEXT,
        timestamp TEXT
      )
    `;
        this.db.run(createTableSQL, (err) => {
            if (err) {
                console.error('Error al crear la tabla contacts:', err.message);
            }
            else {
                console.log('Tabla contacts verificada o creada.');
            }
        });
    }
    addContact(name, email, comment, ip, timestamp) {
        return new Promise((resolve, reject) => {
            const insertSQL = `
        INSERT INTO contacts (name, email, comment, ip, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `;
            this.db.run(insertSQL, [name, email, comment, ip, timestamp], function (err) {
                if (err) {
                    console.error('Error al insertar contacto:', err.message);
                    reject(err);
                }
                else {
                    console.log(`Contacto insertado con ID: ${this.lastID}`);
                    resolve();
                }
            });
        });
    }
    getAllContacts() {
        return new Promise((resolve, reject) => {
            const selectAllSQL = `SELECT * FROM contacts`;
            this.db.all(selectAllSQL, [], (err, rows) => {
                if (err) {
                    console.error('Error al obtener contactos:', err.message);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    // Método opcional para cerrar la conexión a la base de datos
    closeConnection() {
        this.db.close((err) => {
            if (err) {
                console.error('Error al cerrar la base de datos:', err.message);
            }
            else {
                console.log('Conexión a la base de datos cerrada.');
            }
        });
    }
}
exports.ContactsModel = ContactsModel;
//# sourceMappingURL=contactsModel.js.map