const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
const fileUpload = require('express-fileupload');
const requestLogger = require('./src/utils/logger');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const timeoutMiddleware = require('./src/middleware/timeoutMiddleware');


// Set the timeout to 10 seconds (adjust as needed)
const requestTimeout = 10000;


const app = express();
const port = process.env.PORT || 3000;

// Use express-fileupload middleware
app.use(fileUpload());

app.use(bodyParser.json());
app.use('', routes);

// Add logging middleware
app.use(requestLogger);

// Use timeout middleware before defining routes
app.use(timeoutMiddleware(requestTimeout));

// Error handling middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
