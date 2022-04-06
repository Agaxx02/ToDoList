const express = require('express');
const { ConnectionCheckedInEvent } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'task'

    MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
        .then(client => {
            console.log(`Connected to ${dbName} Database`)
            db = client.db(dbName)
        })

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())

        app.get('/', (request, response) => {
            db.collection('tasks').find().toArray()
            .then(data => {
                response.render('index.ejs', {info: data})
            })
            .catch(error => console.error(error))
        })

        app.post('/addTask', (request,response) => {
            db.collection('tasks').insertOne({task: request.body.newTask})
            .then(result => {
                console.log('Task added')
                response.redirect('/')
            })
            .catch(error => console.error(error))
        }) 
        app.listen(process.env.PORT || PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })