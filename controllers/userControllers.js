const passport = require("passport");
const User = require("../models/userModel");
const Quote = require("../models/quotesModel");

const homepage = (req, res) => {
  res.render("homepage", { title: "Home" });
  // res.send("Testing");
};

const registerPost = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const newUser = await User.create({ username, email, password });
    await newUser.save();
    console.log(newUser);
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
  }
};

const register = (req, res) => {
  res.render("register", { title: "Register" });
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
    })(req, res, next);
  } catch (error) {
    console.log(error);
  }
};
const login = (req, res) => {
  res.render("login", { title: "Login" });
};

const quoteContent = async (req, res) => {
  const { quotes, color } = req.body;
  const userId = req.user._id;
  console.log(quotes, color, userId);
  try {
    const content = await Quote.create({ quotes, color, userId });
    await content.save();
    console.log(content);
    res.redirect("/users/dashboard");
  } catch (error) {
    console.log(error);
  }
};
const create = (req, res) => {
  res.render("create", { title: "Create", user:req.user.username});
};

const likeOrDislike = async (req, res) => {
  const loggedIn = req.user._id;
  const createdId = req.params.id;

  try {
    const quote = await Quote.findById(createdId);
    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }

    if (quote.likes.includes(loggedIn)) {
      // Dislike
      await Quote.findByIdAndUpdate(
        createdId,
        { $pull: { likes: loggedIn } },
        { new: true }
      );
      return res.status(200).json({ success: true, message: "Disliked" });
    } else {
      // Like
      await Quote.findByIdAndUpdate(
        createdId,
        { $push: { likes: loggedIn } },
        { new: true }
      );
      return res.status(200).json({ success: true, message: "Liked" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const dashboard = async (req, res) => {
  try {
    const user = req.user.username;
    const notes = await Quote.find({});
    res.render("dashboard", { title: "Dashboard", user, notes });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/homepage");
  });
};

module.exports = {
  homepage,
  registerPost,
  register,
  loginPost,
  login,
  dashboard,
  create,
  quoteContent,
  likeOrDislike,
  logout,
};
