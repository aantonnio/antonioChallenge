require('dotenv').config();
const express = require('express');
// const exitHook = require('exit-hook');
const addRoutes = require('./routes/routes');
const logger = require('./logger/logger');
const persistence = require('./persistence/persistence');

persistence.dbConnect();
const app = express();

addRoutes(app);

app.listen(process.env.PORT, logger.serverStarted);

