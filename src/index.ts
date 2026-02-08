import { app } from './app';
import currenciesRouter from './routes/currencies.routes';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use('/api/currencies', currenciesRouter);
