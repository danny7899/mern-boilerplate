const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('./../../config');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(config.rootDir)));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(config.rootDir, 'index.html'));
});

app.listen(config.mainPort, () => {console.log(`Main server listening on port ${config.mainPort}!`);})
