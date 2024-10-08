import nodemailer from "nodemailer";
import config from "../config";
export const sendEmail=async(to:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV==="production", 
        auth: {
          user: "jannatul.ferdous.nawrin@g.bracu.ac.bd",
          pass: "fqlv mgnn pkmn ojhn",
        },
      });

       await transporter.sendMail({
        from: 'jannatul.ferdous.nawrin@g.bracu.ac.bd', 
        to, 
        subject: "Please reset your password within 60 mins", 
        text: "You are highly requested to reset your password from the link given below. Regards, Cooksy", 
        html, 
      });

}