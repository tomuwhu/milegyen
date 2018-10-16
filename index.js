var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var app = express()
const ObjectId = mongo.ObjectID
app.use(cors())
app.use(bodyParser.json())
var db

MongoClient.connect(
    'mongodb://localhost:27017', 
    { useNewUrlParser: true },
    (err, client) => {
    if (err) throw err
    db = client.db('urlapadatok')
})

app.get('/', (req, res) => 
    db  .collection('alap')
        .find()
        .toArray( (err, result) => 
            err ? res.send(err)
                : res.send(result)
        )
)

app.post('/', (req, res) => {
    if (req.body._id) {
        console.log(req.body._id)
        let id = req.body._id
        delete req.body._id
        db. collection('alap')
            .updateOne({
                _id: ObjectId(id)
            }, { $set: req.body })
            .then( v => {
                console.log(v.result)
                res.send(v.result)
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

app.post('/del', (req, res) => {
    db.collection('alap')
        .deleteOne({
            _id: ObjectId(req.body._id)
        })
        .then(v => {
            console.log(v.result)
            res.send(v.result)
        })
        .catch(
            console.log
        )
})

app.listen(3000)