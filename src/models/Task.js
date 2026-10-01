const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
    index:true
},
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
priority:{
    type:String,
    enum:["low","medium","high"],
    default:"low",
    required:true
},
status:{
    type:String,
    enum:["pending","in-progress","completed"],
    default:"pending",
    required:true
},
dueDate:{
    type:Date,
    required:true
}
}, { timestamps: true });

taskSchema.index({ user: 1, title: 1 }, { unique: true });
taskSchema.index({user:1,createdAt:-1});

module.exports = mongoose.model("Task", taskSchema);