const express = require('express');
const fs = require('fs')
const fs_read = require('node:fs');
const folderPath = './';

const app = express()

//middleware to parse the request body
app.use(express.json())


const date = new Date();
const content = date.toISOString()

let hrs = date.getHours()
let min = date.getMinutes()
let sec = date.getSeconds()

let time = hrs +"h "+ min + "m " + sec + "s"

let filename = date.toLocaleDateString("fr-CA") +" - "+ time

    app.get('/',(req,res)=>{
        let files = fs_read.readdirSync(folderPath)
        let filesList = files.filter(file => {if(file.includes('.txt')) {
            return file
        }
        })
        res.send({filesList})
    })

    app.post('/create',(req,res)=>{
        fs.writeFileSync(`./${filename}.txt`,content, err => {
            if(err){
                console.log(err)
                return
            }
        })
        res.send(`File written successfully--> ${filename}`)
    })

    app.listen(3030, () => {
            console.log("Server running on http://localhost:3030/")
        })
