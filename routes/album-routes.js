const router = require("express").Router();
const albumController = require("../controllers/album-controller");

router.route("/").get(albumController.index);
router.route("/:albumid").get(albumController.getOne);

module.exports = router;
