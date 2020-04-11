const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./server/routes/routes.js')
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/', routes)



app.listen(port, () => console.log(`Server started on port ${port}`))