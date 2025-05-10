import { Database } from 'sqlite3';
import { open } from 'sqlite';

class UserModel { // Assuming the class was intended to be exported without default
    private db: any;

    constructor() {
        this.initDatabase();
    }

    private async initDatabase() {
        this.db = await open({
            filename: './database.sqlite',
            driver: Database
        });
        await this.db.exec(`
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
    }

    async createUser(username: string, email: string, password: string): Promise<any> {
        const createdAt = new Date().toISOString();
        const result = await this.db.run(
            'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)',
            [username, email, password, createdAt]
        );
        return result.lastID;
    }

    async findUserByUsername(username: string): Promise<any | undefined> {
        return this.db.get('SELECT * FROM users WHERE username = ?', [username]);
    }

    async findUserByEmail(email: string): Promise<any | undefined> {
        return this.db.get('SELECT * FROM users WHERE email = ?', [email]);
    }

    async saveResetToken(userId: number, token: string | null, expiration: number | null): Promise<void> {
        await this.db.run(
            'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
            [token, expiration, userId]
        );
    }

    async findUserByResetToken(token: string): Promise<any | undefined> {
        const now = Date.now();
        return this.db.get(
            'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > ?',
            [token, now]
        );
    }
}

export { UserModel };