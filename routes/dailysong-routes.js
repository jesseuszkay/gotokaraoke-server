const router = require("express").Router();
const dailySongController = require("../controllers/dailysong-controller");

router.route("/addSong").post(dailySongController.addSong);
router.route("/addVote").post(dailySongController.addVote);
router.route("/rate/:videoid").patch(dailySongController.rate);
router.route("/get/:videoid").get(dailySongController.getDailySongStats);

module.exports = router;
