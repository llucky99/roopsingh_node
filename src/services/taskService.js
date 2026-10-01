const mongoose = require("mongoose");
const Task = require("../models/Task");

function ensureObjectId(id) {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("Invalid task ID");
    error.statusCode = 400;
    throw error;
  }
}

async function createTask(userId,data ) {
 return await Task.create({ ...data,user: userId });
}

async function listTasks(userId,query){
    const page = Math.max(Number.parseInt(query.page,10) ||1,1);
    const limit = Math.min(Math.max(Number.parseInt(query.limit,10) ||10,1),100);
  const filter = { user: userId };
  if(query.status){
    filter.status = query.status;
  }
  if(query.search){
    filter.title = {$regex:query.search.trim(),$options:"i"};
  }
  const [tasks,total] = await Promise.all([
    Task.find(filter)
    .sort({createdAt:-1})
    .skip((page-1)*limit)
    .limit(limit),
    Task.countDocuments(filter)
  ]);
  return {
    tasks,pagination:{
        page,limit,total,pages:Math.ceil(total/limit)
    }
  }
}

async function getTask(userId,taskId){
    ensureObjectId(taskId);
    return await Task.findOne({ _id: taskId, user: userId });
}

async function updateTask(userId,taskId,data){
    ensureObjectId(taskId);
    const task = await Task.findOneAndUpdate({ _id: taskId, user: userId }, data, { new: true, runValidators: true });
    return task;
}

async function deleteTask(userId,taskId){
    ensureObjectId(taskId);
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    return task;
}

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };