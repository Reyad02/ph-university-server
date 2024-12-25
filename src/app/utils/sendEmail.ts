import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'areyad203011@bscse.uiu.ac.bd',
      pass: 'dath fpgl dwmc wcov',
    },
  });

  await transporter.sendMail({
    from: 'areyad203011@bscse.uiu.ac.bd', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
