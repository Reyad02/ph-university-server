import express from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
  // Promise.reject()
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
