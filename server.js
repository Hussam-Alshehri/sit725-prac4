const MongoClient = require('mongodb').MongoClient;
var express = require("express"),
app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));


app.get('/message', function (req, res) {
  let message = req.query.message;
  console.log(message);
  insertMessage(message);
  res.send('added');
})

app.get('/messages', function (req, res) {
  retrieveMessages(res);
})

const uri = "mongodb+srv://sit725:sit725@sit725-prac4-cluster.b7b6r.mongodb.net/messageboard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let collectionMessage;

client.connect(err => {
  collectionMessage= client.db("messageboard").collection("messages");
});


const insertMessage = (message) => {
  collectionMessage.insertOne({message: message })
}


const retrieveMessages = (res) => {
  collectionMessage.find().toArray(function (err, result) {
   if (err) throw err;
   console.log(result);
    res.send(result);
  })
}

/*setTimeout(function () {
  insertMessage('Hello world')
}, 1000);*/


app.listen(port);
console.log("Listening on port ", port);