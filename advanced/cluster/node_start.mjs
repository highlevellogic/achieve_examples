import http from "node:http";

http.createServer(function(req,res) {
  res.end("hello");
}).listen(8989);