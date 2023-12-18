const express = require("express");
const router = express.Router();

const handler = require("./handler");

router.get("/", (req, res) => {
    handler(req, res);
});

module.exports = router;
