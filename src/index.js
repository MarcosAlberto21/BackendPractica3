const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const mysqlConnection  = require('./database.js');
const PORT = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/', (req,res) => {
    res.send('API gifthub');
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});