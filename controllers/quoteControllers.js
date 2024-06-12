const quotes = require("../models/quotesModel");

const quotespage = (req, res) => {
  res.send("Qutespage");
};

const quoteContent = async (req, res) => {
  const { quote, color } = req.body;
  const userId = req.user._id;
  console.log(quote, color, userId);
  try {
    const content = await quotes.create({ quote, color, userId });
    await content.save();
    console.log(content);
    res.redirect("/quotes/dashboard");
  } catch (error) {
    console.log(error);
  }
};
const create = (req, res) => {
  res.render("create", { title: "Create" });
};

const dashboard = async (req, res) => {
  try {
    const user = req.user._id;
    const notes = await quotes.find({});
    res.render("dashboard", { title: "Dashboard", user, notes });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { quotespage, quoteContent, create, dashboard };
