const express = require("express");
const dotenv = require("dotenv");
const users = require("./routes/userRouter");
const quotes = require("./routes/quotesRouter");
const passport = require("passport");
const initiliazePassword = require("./config/passportAuth");
// const passport = require("./config/passportAuth");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const connectDB = require("./database/databaseConnection");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8090;

// MongoDB COnnection
connectDB();



initiliazePassword(passport);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    },
  })
);



// // Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Initialize flash middleware
app.use(flash());




// Set up a middleware to make flash messages available in views
app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
// Set multiple views directories
app.set("views", [
  path.join(__dirname, "views/users"),
  path.join(__dirname, "views/quotes"),
]);
app.set("view engine", "ejs");

app.use("/", users);
// app.use("/quotes", quotes);
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
