import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/route';



const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));



app.use('/', router);



const test = async(req: Request, res: Response) => {
  
  
  res.send("Cooksy");
};

app.get('/', test);


export default app;
