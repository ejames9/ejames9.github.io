/*
Simple Node.js Developement Server.
Author: Eric Foster
*/


const
    connect = require('connect'),
    server  = require('serve-static');

//Create/Connect to Server, Listen on port 8096
connect().
       use(server('./')).
       listen(8118);

//Log Success to the console.
console.log(
  'Server Running at 127.0.0.1:8118.'
);
