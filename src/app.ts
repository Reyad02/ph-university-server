import express from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.route';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', UserRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
