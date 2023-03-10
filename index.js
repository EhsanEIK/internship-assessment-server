const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// database setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const usersCollections = client.db('assessmentDB').collection('users');

        // usersCollections [GET method]
        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollections.find(query).toArray();
            res.send(users);
        });

        // usersCollections [POST method]
        app.post('/users', async (req, res) => {
            const userInfo = req.body;
            const result = await usersCollections.insertOne(userInfo);
            res.send(result);
        })
    }
    finally { }
}
run().catch(error => console.error(error));


app.get('/', (req, res) => {
    res.send("Assessment app server is running");
});

app.listen(port, () => {
    console.log('Server is runningon port:', port);
});