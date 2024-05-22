"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const server = http_1.default.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    console.log(`Metodas: ${method}, URL: ${url}`);
    if (url == '/calculate' && method == 'POST') {
        const reqBody = [];
        req.on('data', (d) => {
            reqBody.push(d);
        });
        req.on('end', () => {
            const reqData = Buffer.concat(reqBody).toString();
            const va = reqData.split('&');
            const x = parseFloat(va[0].split('=')[1]);
            console.log(`Visi gauti duomenys: ${reqData}`);
            console.log(va);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            let template = fs_1.default.readFileSync('templates/result.html').toString();
            template = template.replace('{{ result }}', `Rezultatas: ${x / 2.54} coliai`);
            res.write(template);
            res.end();
        });
        return;
    }
    if (url == '/') {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        const template = fs_1.default.readFileSync('templates/index.html');
        res.write(template);
        return res.end();
    }
    res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8"
    });
    const template = fs_1.default.readFileSync('templates/404.html');
    res.write(template);
    return res.end();
});
server.listen(2998, 'localhost');
