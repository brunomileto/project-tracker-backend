const express = require('express');
const cors = require('cors');
const config = require('./configuration/config.js');
const userRoutes = require('./routes/user.routes.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes.routes);
