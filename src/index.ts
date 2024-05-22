
import http from 'http';

import fs from 'fs';

const server=http.createServer((req,res)=>{
    const method=req.method;
    const url=req.url;
    console.log(`Metodas: ${method}, URL: ${url}`);

    if (url=='/calculate' && method=='POST'){
        const reqBody:any[]=[];
        req.on('data', (d)=>{
            reqBody.push(d);
        });
        
        req.on('end',()=>{
           
            const reqData=Buffer.concat(reqBody).toString();
            const va=reqData.split('&');
            const x=parseFloat(va[0].split('=')[1]);
            
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            let template=fs.readFileSync('templates/result.html').toString();
            template=template.replace('{{ result }}',`Rezultatas: ${x} cm = ${(x/2.54).toFixed(2)} coliai`);
            res.write(template);
            res.end();
        });
        return;
    }

    if (url=='/'){
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        const template=fs.readFileSync('templates/index.html');
        res.write(template);
        return res.end();
    }
  
    res.writeHead(404, {
        "Content-Type":"text/html; charset=utf-8"
    });
   
    const template=fs.readFileSync('templates/404.html');
    res.write(template);
    return res.end();
    
    
});

server.listen(2998,'localhost');