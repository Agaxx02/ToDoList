const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://Agnieszka:Agnieszka2001@cluster0.fgje5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(client => {
    console.log('Connected to Database')
    const db = client.db('toDoList')
    const taskCollection = db.collection('tasks')

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on ${PORT} port`)
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
     db.collection('tasks').find().toArray()
    .then(results => {
    res.render('index.ejs', { tasks: results})
    })
    .catch(error => console.error(error))
    
    })

app.post('/addTask', (req,res) => {
    taskCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))

  
  })
})
   

