import express from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.route';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/students', UserRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
