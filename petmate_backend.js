const express = require('express');
//console.log(express);
//import { readFile, writeFile } from 'node:fs/promises';
// const fs = require('fs/promises')
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')

let app = express();
let port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.listen(port, ()=>{
    console.log('Server is Listening');
})

app.get('/',(req, res)=>{
    res.send('Hello World!')
})

app.post('/pet-management/V1/pet', (req,res)=>{
    /**
     * ASYNCHRONOUS fs 
    try {
        fs.readFile('../server/formData.json', { encoding: 'utf8' })
        .then(data => {
            jsonData = JSON.parse(data)
            jsonData.push(req.body)
            console.log(jsonData)
            return fs.writeFile('../server/formData.json',JSON.stringify(jsonData))
        }).then(data => res.json({
            "message": "data saved"
        })).catch(err => {
            console.log(err)
            res.status(500)
            res.json({
                "message": "internal error"
            })
        })
      } catch (err) {
        console.error(err.message);
        res.status(500)
        res.json({
            "message": "internal error"
        })
      }
       */
       let data = fs.readFileSync('../server/formData.json', { encoding: 'utf8' });
        let jsonData = JSON.parse(data);
        jsonData.push(req.body);
        console.log(jsonData) 
        fs.writeFileSync("../server/formData.json", JSON.stringify(jsonData));
        
    
})

app.get('/pet-management/V1/pet', (req,res)=>{
    let searchBy = req.query.Searchby;
    let  searchFor= req.query.Searching;
    let formData = fs.readFileSync('../server/formData.json',{encoding: 'utf8' })
    let jsonData = JSON.parse(formData);
    let response = jsonData.filter(obj => {
        if(obj.hasOwnProperty(searchBy) && obj[searchBy]=== searchFor){
            return obj
        }
    } );
    console.log(response)
    res.setHeader('Content-Type', 'application/json')
    res.json(JSON.stringify({'message':response}))
})

