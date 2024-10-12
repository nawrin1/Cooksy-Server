
import config from "../../config";
import Stripe from "stripe";
import { User } from "../User/User.model";

const stripe = new Stripe(config.secret as string);


const paymentIntentService = async (price :any) => {
    // const amount = parseInt(price * 100);
    const amount = parseInt((price?.price * 100).toString());
    console.log(amount, 'amount inside the intent')

  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

       
    const updatedUser = await User.findByIdAndUpdate(
        price.user, 
        { isPremium: true }, 
        { new: true } 
      );
  
      if (!updatedUser) {
        return { message: "User not found" };
      }
  
    return({
      clientSecret: paymentIntent.client_secret
    })

  };

  export const PaymentServices = {
   
    paymentIntentService
    
  };
