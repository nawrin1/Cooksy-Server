import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { PaymentServices } from "./Payment.service";
import config from "../../config";


const paymentIntent = catchAsync(async (req, res) => {
    console.log("intent")

    const price = req.body;
    const result = await PaymentServices.paymentIntentService(price);
    


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Client secret generated successfully!',
      data:result
  });
})


export const PaymentControllers={
    paymentIntent

}
