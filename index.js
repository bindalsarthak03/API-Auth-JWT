const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
//Importing routes
const authRoute = require("./routes/auth");
const postRoute  = require('./routes/posts')

dotenv.config();
//Connect to mongoDB
//PW for admin : 5ToPwxr8XXtLK7pz
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db!")
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use('/api/posts',postRoute);

app.listen(5000, () => console.log("Server is up and running"));
