// src/server.ts
import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import homeRoutes from './routes/homeRoutes';
import paymentRoutes from '../routes/paymentRoutes';
import adminRoutes from './routes/adminRoutes';
import contactRoutes from '../routes/contactRoutes';
import userRoutes from '../routes/userRoutes';

const app = express();
const port = 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); 

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout'); 

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', homeRoutes);
app.use('/', paymentRoutes);
app.use('/admin', adminRoutes);
app.use('/', contactRoutes);
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});