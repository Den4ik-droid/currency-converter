import express from 'express';
import cookieParser from 'cookie-parser';
import { userIdCookie } from './middleware/userIdCookie';

import userRoutes from './routes/user.routes';

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(userIdCookie);

app.use('/api/user', userRoutes);
// Роуты добавим позже
