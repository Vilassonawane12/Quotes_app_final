const express = require("express");
const {
  quotespage,
  quoteContent,
  create,
  dashboard
} = require("../controllers/quoteControllers");
const router = express.Router();

router.get("/", quotespage);

router.post("/create", quoteContent);
router.get("/create", create);

router.get("/", quotespage);
router.get("/", quotespage);

router.get("/dashboard", dashboard);

module.exports = router;
