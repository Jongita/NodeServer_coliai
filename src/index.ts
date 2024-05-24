
import http from 'http';

import fs from 'fs';

const server=http.createServer((req,res)=>{
    const method=req.method;
    const url=req.url;
    console.log(`Metodas: ${method}, URL: ${url}`);

    if ((url=='/convert-cm' || url=='/convert-inch') && method=='POST'){
        const reqBody:any[]=[];
        req.on('data', (d)=>{
            reqBody.push(d);
        });
        
        req.on('end',()=>{
           
            const reqData=Buffer.concat(reqBody).toString();
          
            const cm=parseFloat(reqData.split('=')[1]);
            const inch=parseFloat(reqData.split('=')[1]);
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            let template=fs.readFileSync('templates/result.html').toString();
            if(url=='/convert-cm'){
                 template=template.replace('{{ result }}',`Rezultatas: ${cm} centimetrų = ${(cm/2.54).toFixed(2)} coliai`);
            }else{
                 template=template.replace('{{ result }}',`Rezultatas: ${inch} colių = ${(inch*2.54).toFixed(2)} centimetrai`);
            }
           
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