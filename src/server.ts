import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import todoRouter from './routes/todo.route';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/apiDocs';

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);
// Swagger Documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
