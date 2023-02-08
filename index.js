const express =require('express');
const router = require('./src/routes/userRoute');
const app=express();
app.use(express.json());

const userRouter=require('./src/routes/userRoute');

app.use('/api/users',userRouter);


require("dotenv").config();




app.listen(process.env.APP_PORT,()=>
console.log("server running on 3000"));
