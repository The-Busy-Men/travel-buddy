import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../../../../.env') });

console.log(process.env.DB_PORT);

export const getPort = () => {
  return getEnvAsNumber('PORT');
};

export const getDBPort = () => {
  return getEnvAsNumber('DB_PORT');
};

export const getDBHost = () => {
  return getEnvAsString('DB_HOST');
};

export const getDBName = () => {
  return getEnvAsString('DB_NAME');
};

export const getDBUser = () => {
  return getEnvAsString('DB_USERNAME');
};

export const getDBPassword = () => {
  return getEnvAsString('DB_PASSWORD');
};

function getEnvAsString(key: string): string {
  const value = process.env[key];
  if (value !== undefined) {
    return value;
  }
  throw new Error(`Environment variable ${key} is not set.`);
}
function getEnvAsNumber(key: string): number {
  const value = process.env[key];
  if (value !== undefined) {
    const valAsNumber = parseInt(value, 10);
    if (isNaN(valAsNumber)) {
      throw new Error(`Environment variable ${key} is not a valid number.`);
    }
    return valAsNumber;
  }
  throw new Error(`Environment variable ${key} is not set.`);
}
