const taskService = require("../services/taskService");

const { success } = require("../utils/apiResponse");

async function create(req,res){
    const task = await taskService.createTask(req.user._id,req.body);
    return success(res,201,"Task created successfully",task);
}

async function list(req,res){
    const tasks = await taskService.listTasks(req.user._id,req.query);
    return success(res,200,"Tasks fetched successfully",tasks);
}

async function get(req,res){
    const task = await taskService.getTask(req.user._id,req.params.id);
    if(!task){
        return res.status(404).json({
            success:false,
            message:"Task not found"
        })
    }
    return success(res,200,"Task fetched successfully",task);
}

async function update (req,res){
const task = await taskService.updateTask(req.user._id,req.params.id,req.body);
if(!task){
    return res.status(404).json({
        success:false,
        message:"Task not found"
    })
}
return success(res,200,"Task updated successfully",task);
}

async function remove(req,res){
    const task = await taskService.deleteTask(req.user._id,req.params.id);
    if(!task){
        return res.status(404).json({
            success:false,
            message:"Task not found"
        })
    }
    return success(res,200,"Task deleted successfully",task);
}

module.exports = {create,list,get,update,remove};
