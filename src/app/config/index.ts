import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_rounds: process.env.SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  node_env: process.env.NODE_ENV,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES,
  reset_pass_ui_link:process.env.RESET_PASS_UI_LINK,
  nodemailer_email:process.env.NODEMAILER_TRANSPORT_EMAIL,
  nodemailer_pass:process.env.NODEMAILER_TRANSPORT_PASS,
};
