import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

import cookieParser from 'cookie-parser';
import router from './app/route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));



// alternative application routes
app.use('/', router);


const test = async(req: Request, res: Response) => {
  
  const a = 10;
  res.send("Cooksy");
};

app.get('/', test);

app.use(globalErrorHandler);

// app.use(notFound);

export default app;
