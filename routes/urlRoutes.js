const express = require("express");
const { shortenUrl, redirectUrl, getUserUrls } = require("../controllers/urlController");

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:code", redirectUrl);
router.get("/:code", getUserUrls);

module.exports = router;
