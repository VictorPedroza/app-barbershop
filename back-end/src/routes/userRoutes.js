const Express = require("express");
const userControler = require("../controllers/userController");
const router = Express.Router();

router.get("/", userControler.listAll);

router.post("/Register", userControler.register);

module.exports = router;
