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
exports.UserModel = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
class UserModel {
    constructor() {
        this.initDatabase();
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield (0, sqlite_1.open)({
                filename: './database.sqlite',
                driver: sqlite3_1.Database
            });
            yield this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                password TEXT,
                created_at TEXT,
                reset_token TEXT,
                reset_token_expires INTEGER
            )
        `);
        });
    }
    createUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date().toISOString();
            const result = yield this.db.run('INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)', [username, email, password, createdAt]);
            return result.lastID;
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.get('SELECT * FROM users WHERE username = ?', [username]);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.get('SELECT * FROM users WHERE email = ?', [email]);
        });
    }
    saveResetToken(userId, token, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [token, expiration, userId]);
        });
    }
    findUserByResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            return this.db.get('SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > ?', [token, now]);
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map