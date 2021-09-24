/* Objective
Create a server that responds to requests
The server should have at least ‘/echo’, ‘/’, and ‘/about’ endpoints
The server will account for ‘not found’ endpoints
The ‘/echo’ endpoint will use the ReadStream response object to read the request body, and return the request body as the response body to the client

The ‘/’ endpoint will respond as you wish
The ‘/about’ endpoint will return a JSON response with information about yourself

Steps
Create a project folder named ‘node_http’
Create a new file named ‘server.js’
Import the http module
Using the http module, call the createServer

Pass in a request handler callback function to the createServer method that receives request and response objects as parameters

Add an event listener to the request object that listens for the ‘data’ event to be emitted from the ReadStream
Store the chunks in an array
Add an event listener to the request object that listens for the ‘end’ event to be emitted from the ReadStream
Set a new variable ‘body’ equal to Buffer.concat(array).toString()
Write a conditional statement that assesses the request url, and responds appropriately:
‘/’ - Wildcard. Respond with whatever information you wish
‘/about’ - Respond with an object that has information about yourself
‘/echo’ - Respond with an object that, a minimum, includes the request method, url and body.
Make sure to end your response with .end()
Set your server to listen on port 3000
Initiate the file using the node.js CLI
 */

const http = require('http');

http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    const chunks = [];

    request
      .on('error', (err) => {
        console.error(err);
        response.end();
      })
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        const body = Buffer.concat(chunks).toString();

        switch (request.url) {
          case '/':
            response.write('<h1 style="text-align: center">Homepage</h1>');
            break;
          case '/about':
            response.write('<h1 style="text-align: center">About Page</h1>');
            break;
          case '/echo':
            response.write(JSON.stringify({ method: request.method, url: request.url, body }));
            break;
          default:
            response.write('<h1 style="text-align: center">Page not found</h1>');
        }
        response.end();
      });
    })
  .listen(3000, function () {
    console.log("Server listening...")
  });