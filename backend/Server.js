require ('dotenv').config();
const express = require('express');
const app = express();
// const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');

const env = process.env.PORT

app.use(cors());
app.use(express.json());
// app.use('/', router);

app.get('/',(req,res)=>{
    res.send ('Hello MongoDB');
})

//connect db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to mongodb')
})
.catch(() => {
    console.log('error')
});

app.use('/auth', require('./routes/AuthRoutes'))
app.use('/protected',require('./routes/Protected'))
app.use("/projects", require("./routes/ProjectRoutes"));
app.use("/projects/:projectId/tasks", require("./routes/TaskRoutes"));
app.use("/tasks", require("./routes/TaskRoutes"));

app.listen(env,()=>{
    console.log('Server is running on port',env);
})
