import { Request, Response } from 'express';
import { ContactsModel } from '../models/contactsModel';

export class ContactsController {
    private contactsModel: ContactsModel;

    constructor() {
        this.contactsModel = new ContactsModel();
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { name, email, comment } = req.body;

        if (!name || !email || !comment) {
            res.status(400).send('Faltan campos obligatorios.');
            return;
        }

        const ip = req.ip;
        const timestamp = new Date().toISOString();

        try {
            await this.contactsModel.addContact(name, email, comment, ip || 'N/A', timestamp);
            // Redirigir a una página de éxito o a la página principal
            res.redirect('/'); // O res.render('pages/success', { message: 'Mensaje enviado con éxito!' });
        } catch (error) {
            console.error('Error al guardar el contacto:', error);
            res.status(500).send('Error al guardar el contacto.');
        }
    }

    public async index(req: Request, res: Response): Promise<void> {
        try {
            const contacts = await this.contactsModel.getAllContacts();
            res.render('pages/admin/contacts', { contacts });
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
            res.status(500).send('Error al obtener los contactos.');
        }
    }
}