const app = require('./app.js');
const config = require('./configuration/config.js');

console.log(module.filename)
app.listen(config.port, () => {
  console.log("Server is running on: " + config.url)
})