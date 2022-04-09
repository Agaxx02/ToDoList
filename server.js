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
                db.collection('tasks').countDocuments({completed: false})
                .then(itemsLeft => {
                    response.render('index.ejs', { info: data, left: itemsLeft })
                })
            })
            .catch(error => console.error(error))
        })
    

        app.post('/addTask', (request,response) => {
            db.collection('tasks').insertOne({task: request.body.newTask, completed: false})
            .then(result => {
                console.log('Task added')
                response.redirect('/')
            })
            .catch(error => console.error(error))
        }) 
        app.put('/markComplete', (request, response) => {
            db.collection('tasks').updateOne({task: request.body.itemCompleted}, {
                $set: {
                    completed: true
                }
            }, {
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                console.log('Marked complete')
                response.json('Marked complete')
            })
            .catch(error => {
                console.error(error)
            })
        })
        app.put('/markUncomplete', (request, response) => {
            db.collection('tasks').updateOne({task: request.body.itemNotCompleted}, {
                $set: {
                    completed: false
                }
            }, {
                sort: {_id:-1},
                upsert: false
            })
            .then(result => {
                console.log('Marked Uncomplete')
                response.json('Marked Uncomplete')
            })
        
            .catch(error => console.error(error))
        })

        app.delete('/deleteTask', (request, response) => {
            db.collection('tasks').deleteOne({taskName: request.body.taskNameS})
            .then(result => {
                console.log('Task deleted')
                response.json('Task deleted')
            })
            .catch(error => console.error(error))
        })




        app.listen(process.env.PORT || PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })