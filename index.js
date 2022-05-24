const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zm5jm.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const productCollection = client.db("green-bikester").collection("products");

    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })
    app.get('/purchase/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id: ObjectId(id)};
      const cursor = await productCollection.findOne(query);
      console.log(cursor);
      res.send(cursor);
    })
    
    
  } finally {
    // client.close();
  }
}
run().catch(console.dir);




































app.get('/', (req, res) => {
  res.send('Hello Green Bikester!')
})

app.listen(port, () => {
  console.log(`Green Bikester app listening on port ${port}`)
})