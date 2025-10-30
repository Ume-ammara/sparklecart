import dotenv from "dotenv";
dotenv.config();

interface EnvConfigShape {
  PORT: string;
}

const env: EnvConfigShape = {
  PORT: process.env.PORT,
};

export { env };
