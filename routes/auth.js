const router = require("express").Router();
const User = require("../model/User");
const { loginValidation, registerValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res, next) => {
  //VALIDATING DATA BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check for existingUser
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist!");

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//LOGIN

router.post("/login", async (req, res, next) => {
  //Validating the data before we add a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Searching for existing user
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("User does not exist");

  //Check for correct password
  const validPassword = bcrypt.compare(
    req.body.password,
    existingUser.password
  );
  if (!validPassword) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const token = jwt.sign({_id:existingUser._id},process.env.TOKEN_SECRET);
  res.header('auth-token',token).send(token);
});

module.exports = router;
