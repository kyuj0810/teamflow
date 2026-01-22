import expreee from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

const app = expreee();

app.use(expreee.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(errorMiddleware);

export default app;
