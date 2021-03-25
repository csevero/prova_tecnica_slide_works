import express from 'express';
import route from './routes';
import cors from 'cors';

require('dotenv').config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(route);

server.listen(process.env.PORT || 3333, () => {
  console.log('server is running');
});
