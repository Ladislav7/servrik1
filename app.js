const http = require("http");
const fs = require("fs");
const url = require("url");

let citac = 0;
let zpravy = new Array();

function main(req, res) { //hlavni funkcnost meho serveru
    console.log(req.url);
    if (req.url == "/"){
        res.writeHead(200, {"Content-type":"text/html"});
        let s = fs.readFileSync("index.html");
        res.end(s);
    } else if (req.url == "/citac"){
        citac++;
        let obj = {};
        obj.citac = citac;
        obj.popis = "Muj prvni JSON ze serveru";
        res.writeHead(200, {"Content-type":"application/json"});
        res.end(JSON.stringify(obj));
    } else if (req.url.startsWith("/chat/list")){
        let obj = {};
        obj.messages = zpravy;
        res.writeHead(200, {"Content-type":"application/json"});
        res.end(JSON.stringify(obj));
    } else if (req.url.startsWith("/chat/add")){
        let q = url.parse(req.url, true);
        console.log(q.query);
        let s = q.query.msg;
        zpravy.push(s);
        let obj = {};
        obj.messages = zpravy;
        res.writeHead(200, {"Content-type":"application/json"});
        res.end(JSON.stringify(obj));
    }else {
        res.writeHead(404, {"Content-type":"text/html"});
        res.end();
    }
}
let srv = http.createServer(main);
srv.listen(8080);

console.log("Server bezi na adrese http://localhost:8080");