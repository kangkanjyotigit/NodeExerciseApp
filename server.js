const express = require('express');
const router = express.Router();
const MongoClient = require('Mongodb').MongoClient;
const assert = require('assert');
const jwt =require('jsonwebtoken');
const cors = require('cors');

const url="mongodb+srv://kangkan:Pathsala@123@mygrocery-u9tcl.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "WorkShop";

// router.get('/',async(req,res)=>{
//     res.send('The App is working');
// })
 
router.get('/',cors(),async(req,res,next)=>{
    try {
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            const db = client.db(dbName);
            const collection = db.collection('userDetails');
            collection.find({}).toArray(function (err, docs) {
                assert.strictEqual(err, null);
                res.json(docs);
            });
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/submit',cors(),async(req,res,next)=>{
    try {
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            const db = client.db(dbName);
            let userdata = req.body;
            console.log('This method has been called' + userdata.Image);
            const collection = db.collection('userDetails');
            collection.insertOne(userdata, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    let payload = { subject: results._id };
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({ token, id: results._id });
                }
            })
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
})

module.exports= router;