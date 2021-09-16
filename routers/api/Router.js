const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const userName = 'dbUser';
const password = '1234';
const clusterName = "winkdatabase";
const uri =  `mongodb+srv://${userName}:${password}@${clusterName}.lkw63.mongodb.net`;

const db = "WinkDb";
const collection = "users";

// Ottieni la lista completa dei post
router.get('/getAllPosts', async (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

	await client.connect();

	const cursor = await client.db(db).collection(collection).find().sort( { $natural : -1 } );

	const results = await cursor.toArray();

	await client.close();

	res.json(results);
})

// Ottieni una lista di post che contengono gli Hastag passati
router.post('/searchPosts', async (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	await client.connect();

	const cursor = await client.db(db).collection(collection).find( { hashtags: { $all: req.body.hashtags } } ).sort( { $natural : -1 } );

	const results = await cursor.toArray();

	await client.close();

	res.json(results);
})

//Pubblica un nuovo post
router.post('/addPost', async (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	await client.connect();

	const result = await client.db(db).collection(collection).insertOne(req.body);

	await client.close();

	res.send(result);
})

//Cancella un post
router.post('/deleteOne', async (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	await client.connect();

	const objID = new ObjectId(req.body._id);

	const result = await client.db(db).collection(collection).deleteOne( { "_id": objID } );

	await client.close();

	res.send(result);
})

module.exports = router