import express from 'express';
import cookieParser from 'cookie-parser';
import { userIdCookie } from './middleware/userIdCookie';

import userRoutes from './routes/user.routes';
import currenciesRouter from './routes/currencies.routes';
import ratesRouter from './routes/rates.routes';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const app = express();

const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');

app.use(express.json());
app.use(cookieParser());
app.use(userIdCookie);

app.use('/api/user', userRoutes);
app.use('/api/currencies', currenciesRouter);
app.use('/api/rates', ratesRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
