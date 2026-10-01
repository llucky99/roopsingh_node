const express = require("express");
const router = express.Router();
const {register,login,me} = require("../controllers/authController");

const authenticate = require("../middlewares/auth");

const validate = require("../middlewares/validate");

const {registerSchema,loginSchema} = require("../validators/authValidator");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authenticate, me);

module.exports = router;