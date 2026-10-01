const express = require("express");
const taskController = require("../controllers/taskController");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/auth");
const router = express.Router();
const { createTaskSchema, updateTaskSchema } = require("../validators/taskValidator");
router.use(authenticate);
router.use(validate);

router.post("/", validate(createTaskSchema), taskController.create);
router.get("/",  taskController.list);
router.get("/:id",  taskController.get);
router.put("/:id", validate(updateTaskSchema), taskController.update);
router.delete("/:id",  taskController.remove);

module.exports = router;