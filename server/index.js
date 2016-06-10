// main starting point
// start server with node index.js
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
	//morgan and bodyparser are middleware
app.use(morgan('combined')); // logger
app.use(bodyParser.json({ type: '*/*' })); // all requests parsed into json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ', port);
