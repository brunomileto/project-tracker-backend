const dbUtils= require('../databases/firebase/firebaseUtils/firebase.firestore.db.utils.js');
const Utils = require('../utilities/utils.js');
const {v4} = require('uuid');
const {collections, firebaseWhere} = require ('../enumerators/enums.js');
const {Project} = require('../models/project.models.js');
const User = require('../models/user.models.js');
const {getResponseObj} = require('./basic.controller');

async function createProject(request, response, next){
  try {
    const data = request.body;
    data.ownerUid = request.user.uid;
    
    const project = new Project(data);
    project.uid = v4()
    const projectCreated = await dbUtils.createDoc(collections.projects, project.uid, Utils.objectToJson(project));

    var responseObj = getResponseObj(projectCreated.success, project)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error);
  }
};

async function getAllProjects(request, response, next){
  try {
    const projectList = [];
    const ownerUid = request.user.uid;

    const projectsSnapshot = await dbUtils.getWhere(collections.projects, 'ownerUid' , firebaseWhere.equal, ownerUid);
    if(projectsSnapshot.success){
      projectsSnapshot.snapshot.forEach((project) => {
        projectList.push(project.data())
      })
    }

    var responseObj = getResponseObj(projectsSnapshot.success, projectList)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error)
  }
};

async function getProject(request, response, next){
  try {
    const projectUid = request.params.projectUid;

    const projectSnapshot = await dbUtils.getDoc(collections.projects, projectUid);
    var project = {}
    if(projectSnapshot.success){
      project = projectSnapshot.snapshot.data();
    }   

    var responseObj = getResponseObj(projectSnapshot.success, project)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error)
  }
};


async function updateProject(request, response, next){
  try {
    const ownerUid = request.user.uid;
    const data = request.body;

    data.ownerUid = ownerUid;

    const project = new Project(data);

    const projectUpdated = await dbUtils.updateDoc(collections.projects, project.uid, Utils.objectToJson(project));

    var responseObj = getResponseObj(projectUpdated.success, project)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
}