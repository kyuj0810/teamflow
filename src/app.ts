import expreee from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import userRouter from './routes/user.route';

const app = expreee();

app.use(expreee.json());
app.use('/users', userRouter);
app.use(errorMiddleware);

export default app;
