const express = require("express");
const passport = require("passport");
const router = express.Router();

const { register, login, logout, getUsers } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", passport.authenticate("admin", { session: false }), getUsers);
router.get("/:id", passport.authenticate("admin", { session: false }), getUsers);

module.exports = router;
