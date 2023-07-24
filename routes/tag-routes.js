const router = require("express").Router();
const tagController = require("../controllers/tag-controller");

router.route("/").get(tagController.index);

module.exports = router;
