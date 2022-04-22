const dbUtils= require('../databases/firebase/firebaseUtils/firebase.firestore.db.utils.js');
const Utils = require('../utilities/utils.js');
const {v4} = require('uuid');
const {collections, firebaseWhere} = require ('../enumerators/enums.js');
const {Task} = require('../models/task.models.js');
const User = require('../models/user.models.js');
const {getResponseObj} = require('./basic.controller');

async function projectExist(projectUid){
  const projectSnapshot = await dbUtils.getDoc(collections.projects, projectUid);

  return projectSnapshot.success && projectSnapshot.snapshot.exists;

}

async function createTask(request, response, next){
  try {
    const data = request.body;
    data.ownerUid = request.user.uid;
    data.projectOwner = request.params.projectUid;
    var task = new Task(data);
    const projectExists = await projectExist(request.params.projectUid);
    var taskCreated = {}
    if(projectExists){
      task.uid = v4()
      taskCreated = await dbUtils.createDoc(collections.tasks, task.uid, Utils.objectToJson(task));
    }
    var responseObj = getResponseObj(taskCreated.success, task)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error);
  }
};

async function getAllTasks(request, response, next){
  try {
    const projectOwner = request.params.projectUid;

    const projectExists = await projectExist(request.params.projectUid);
    var tasksSnapshot = {}
    if(projectExists)
      tasksSnapshot = await dbUtils.getWhere(collections.tasks, 'projectOwner' , firebaseWhere.equal, projectOwner);
    

    var tasksList = [];
    if(tasksSnapshot.success){
      tasksSnapshot.snapshot.forEach((tasks) => {
        tasksList.push(tasks.data())
      })
    }

    var responseObj = getResponseObj(tasksSnapshot.success, tasksList)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error)
  }
};

async function getTask(request, response, next){
  try {
    const taskUid = request.params.taskUid;

    const taskSnapshot = await dbUtils.getDoc(collections.tasks, taskUid);
    var task = {}

    if(taskSnapshot.success)
      task = taskSnapshot.snapshot.data();

    var responseObj = getResponseObj(taskSnapshot.success, task)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error)
  }
}

async function updateTask(request, response, next){
  try {
    const data = request.body;
    data.ownerUid = request.user.uid;var task = new Task(data);
    var taskUpdated = {}
    taskUpdated = await dbUtils.updateDoc(collections.tasks, task.uid, Utils.objectToJson(task));
    var responseObj = getResponseObj(taskUpdated.success, task)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
}