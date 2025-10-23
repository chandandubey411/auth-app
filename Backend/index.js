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
const corsOptions = {
  origin: 'https://auth-app-frontend-enw7.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/auth', AuthRouter)
app.use('/products', productRouter)

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
