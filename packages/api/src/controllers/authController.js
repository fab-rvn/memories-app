const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const sanitazeUser = require("../utils/sanitazeUser");

const signUp = async (req, res) => {
  const {
    familyName,
    givenName,
    email,
    password,
    confirmPassword,
    imageUrl,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password don't match!" });
      }
      var hashedPassword = await bcrypt.hash(password, 12);
    }

    const user = await User.create({
      name: `${givenName} ${familyName}`,
      email: email,
      imageUrl: imageUrl || null,
      password: hashedPassword || null,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET,
      { expiresIn: "1h" },
    );

    const sanitazedUser = sanitazeUser(user);

    return res.status(201).json({ user: sanitazedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong! Try again later." });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    if (password) {
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" },
    );

    const sanitazedUser = sanitazeUser(existingUser);

    res.status(200).json({ user: sanitazedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong! Try again later." });
  }
};

module.exports = { signIn, signUp };
