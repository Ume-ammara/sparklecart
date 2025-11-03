import dotenv from "dotenv";
dotenv.config();

interface EnvConfigShape {
  PORT: string;
  DATABASE_URL: string;
}

const env: EnvConfigShape = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};

export { env };
