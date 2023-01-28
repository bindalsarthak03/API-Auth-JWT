const express = require("express");
const app = express();

//Importing routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user',authRoute);

app.listen(5000, () => {
  console.log("Server is up and running");
});
