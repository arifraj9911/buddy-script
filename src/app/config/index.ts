import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET,
  token_duration:process.env.TOKEN_DURATION
};
