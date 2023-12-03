// src/config.js
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.CONNECTION_STR) {
  console.error("CONNECTION_STR is not defined");
  process.exit(1);
}
//AddType text/javascript .js


// Export the CONNECTION_STR environment variable as default
export default {
  CONNECTION_STR: process.env.CONNECTION_STR
};
