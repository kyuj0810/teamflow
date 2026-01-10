import expreee from 'express';
import userRouter from './routes/user.route';

const app = expreee();

app.use(expreee.json());
app.use('/users', userRouter);

export default app;
