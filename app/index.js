/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.08.13
 * Time: 21:25
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");

function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

http.createServer(onRequest).listen(8888);

console.log("asd");