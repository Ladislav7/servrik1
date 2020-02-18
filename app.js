const http = require("http");
const fs = require("fs");

function main(req, res) { //hlavni funkcnost meho serveru
    res.writeHead(200, {"Content-type":"text/html"});
    let s = fs.readFileSync("index.html").toString();
    console.log(s);
    res.end(s);
}

let srv = http.createServer(main);
srv.listen(8080);

console.log("Server bezi na adrese http://localhost:8080");