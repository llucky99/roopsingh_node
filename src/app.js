const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); 

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")
const errorHandler = require("./middlewares/errorHandler");

// const taskRoutes = require("./routes/taskRoutes");

const app = express();
dotenv.config();
app.use(cors({origin: "*"}));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("API is running");
});

app.use(("/api/auth"),authRoutes);
app.use(("/api/tasks"),taskRoutes);
app.use(errorHandler);
module.exports = app;
