const Joi = require("joi");

const crateTaskSchema = Joi.object({
  title: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(2).max(500).required(),
  priority: Joi.string().valid("low", "medium", "high").default("low").required(),
  status: Joi.string().valid("pending", "in-progress", "completed").required(),
  dueDate: Joi.date().iso().optional(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().trim().min(2).max(100),
    description: Joi.string().trim().min(2).max(500),
    priority: Joi.string().valid("low", "medium", "high").default("low"),
    status: Joi.string().valid("pending", "in-progress", "completed"),
    dueDate: Joi.date().iso().optional(),
});

module.exports = { crateTaskSchema, updateTaskSchema };