const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes.js');
const sessionRoutes = require('./routes/session.routes.js');
const projectRoutes = require('./routes/project.routes.js');
const taskRoutes = require('./routes/task.routes.js');

const app = express();

app.use(express.json());
app.use(cors());



app.use('/api', sessionRoutes.routes);
app.use('/api', userRoutes.routes);
app.use('/api', projectRoutes.routes);
app.use('/api', taskRoutes.routes);

app.use((error, req, res, next) => {
  console.log('ERROR MIDDLEWARE || ' + error);
  var returnObj = {success: false, message: error.message, data: {}}
    
  res.status(500).json(returnObj);
})

module.exports = app;