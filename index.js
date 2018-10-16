var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var app = express()
app.use(cors())
app.use(bodyParser.json())
var db

MongoClient.connect(
    'mongodb://localhost:27017', 
    {
        useNewUrlParser: true
    },
    (err, client) => {
    if (err) throw err
    db = client.db('urlapadatok')
})


app.get('/', (req, res) => 
    db.collection('alap').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
    })
)

app.post('/', (req, res) => {
    if (req.body._id) {
        console.log(req.body._id)
        let id = req.body._id
        delete req.body._id
        db.collection('alap')
            .updateOne({
                _id: id
            }, { $set: req.body })
            .then( v => {
                console.log(req.body)
                res.send({mentve: 1})
            })
            .catch(
                 console.log
            )
    } else {
        db.collection('alap')
            .insertOne(req.body)
            .then(
                res.send(req.body)

            )
    }
    
})

app.listen(3000)