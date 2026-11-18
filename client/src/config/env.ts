import dotenv from "dotenv";

dotenv.config({ quiet: true });

function required(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const ENV = {
  CLIENT_URL: required("CLIENT_URL") + "/api",
};
