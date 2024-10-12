import express from 'express';




import { PaymentControllers } from './Payment.controller';


const router = express.Router();



  

  router.post(
    '/create-payment-intent',
    
    PaymentControllers.paymentIntent,
  );



 

export const PaymentRoutes = router;