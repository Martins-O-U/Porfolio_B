const express = require('express');
const dotenv = require('dotenv');
const guest = require('../Guest/guest-controller')

dotenv.config();

const cors = require('cors');
const helmet = require('helmet');
const server = express();

server.use(cors())
server.use(helmet());
server.use(express.json());
server.use('/api', guest)


server.get('/', (req, res) => {
    return res.json({ message: 'API is up 🚀' });
});

module.exports = server;
