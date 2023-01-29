const router = require("express").Router();
const User = require("../model/User");
const verify = require('./verifyToken');

router.get('/',verify,(req,res,next)=>{
    res.send(req.user);
})

module.exports = router;