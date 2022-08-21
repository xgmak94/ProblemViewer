const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('tiny'));

app.use('/', routes);

let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});