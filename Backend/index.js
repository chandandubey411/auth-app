const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyparsor = require('body-parser');
const cors = require('cors');
require('dotenv').config();
connectDB();
const AuthRouter = require('./routes/AuthRouter')
const productRouter = require('./routes/ProductRouter')

app.get('/ping',(req,res)=>{
    res.send('pong');
})
app.use(bodyparsor.json());
app.use(cors());
app.use('/auth', AuthRouter)
app.use('/products', productRouter)

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
