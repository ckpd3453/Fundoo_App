import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();
const redisDb = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  logger.info(`Connected to the redis database - ${client.isReady}`);
  //   const value = await client.get('key');
  //   console.log(value);
  //   await client.disconnect();
};

export default redisDb;
