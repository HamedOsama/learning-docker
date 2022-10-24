const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const port = process.env.PORT || 3000;

const app = express();

// HOST and PORT of redis DB
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis'));

//connect to redis
redisClient.connect();

// MongoDB connection configuration
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'mongo';
const DB_PORT = 27017;

const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

//connect to MongoDB
mongoose
  .connect(url)
  .then(() => console.log('connected to db successfully.'))
  .catch(e => console.log('failed to connect to database.'));

// home page
app.get('/', async (req, res) => {
  await redisClient.set('products', 'products...')
  res.send(`hello world from ${process.env.NODE_ENV}`);
});

app.get('/test', async (req, res) => {
  res.send(`Test for updates`);
});

app.get('/data', async (req, res) => {
  const product = await redisClient.get('products')
  redisClient.set('product', 'products...')
  res.send(product);
});

// initialize server listening
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});