const router = require("express").Router();
const songController = require("../controllers/song-controller");

router.route("/").get(songController.index);
router.route("/:filter").get(songController.filter);

module.exports = router;
