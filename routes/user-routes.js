const router = require("express").Router();
const userController = require("../controllers/user-controller");
const bcrypt = require("bcrypt");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router
  .route("/profile")
  .get(userController.profile)
  .get(userController.retrieveUserDetails);
router.route("/profile/add").post(userController.add);
router.route("/profile/:userid/:songid").delete(userController.remove);

module.exports = router;
