const express = require("express");
const {
  homepage,
  registerPost,
  register,
  loginPost,
  login,
  dashboard,
  quoteContent,
  create,
  likeOrDislike,
  logout,
} = require("../controllers/userControllers");
// const passport = require("../config/passportAuth");
const router = express.Router();
const isAuthentication = require("../middlewares/isAuthentication");

router.get("/homepage", homepage);

router.get("/users/register", register);
router.post("/users/register", registerPost);

router.get("/users/login", login);
// router.post(
//   "/users/login",
//   passport.authenticate("local", {
//     successRedirect: "/users/dashboard",
//     failureRedirect: "/users/login",
//     failureFlash: true,
//   })
// );

router.post("/users/login", loginPost);

router.post("/users/create", isAuthentication, quoteContent);
router.get("/users/create", isAuthentication, create);

router.put("/users/likeOrDislike/:id",isAuthentication, likeOrDislike);

router.get("/users/dashboard", isAuthentication, dashboard);

// router.post("/logout", logoutPost);  //jusst we can user here get Method
router.get("/users/logout", logout);

module.exports = router;
