const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

let {
  PORT,
  HOST,
  HOST_URL,
} = process.env;

let correctPort = process.env.PORT;
if (correctPort == null || correctPort == "") {
  correctPort = PORT;
}
console.log(correctPort)
console.log(HOST)

assert(correctPort, "PORT is required!");
assert(HOST, "HOST is required!");

module.exports = {
  port: correctPort,
  host: HOST,
  url: HOST_URL,
};
