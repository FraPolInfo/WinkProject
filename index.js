const express = require('express');
const router = require('./routers/api/Router');
const path = require('path');

const app = express();

app.use( express.static(path.join(__dirname, '/public/dist')) );

// Body Parser per Json
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.use('/api/posts', router);


//Setto la Porta su cui far partire il server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server Started'));