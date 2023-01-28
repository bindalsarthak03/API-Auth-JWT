const router = require("express").Router();

router.post('/register',(req,res,next)=>{
    res.send('Register');
})

module.exports = router;
