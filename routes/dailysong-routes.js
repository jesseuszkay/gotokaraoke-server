const router = require("express").Router();
const dailySongController = require("../controllers/dailysong-controller");

router.route("/add").post(dailySongController.add);
router.route("/rate/:videoid").patch(dailySongController.rate);

module.exports = router;
