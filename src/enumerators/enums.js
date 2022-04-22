const collections = {
  users: 'USERS',
  projects: 'PROJECTS',
  tasks: 'TASKS',
}

const firebaseWhere = {
  equal: '==',
  more_then: '>',
  less_then: '<',
  more_equal_then: '>=',
  less_equal_then: '<='
}

const userRoutes = {
  create_user: 1,
  update_user: 2,
}

const weekDay = {
  sunday: 0,
  monday: 1,
  tuesday : 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
}

const status = {
  success: "success",
  error: "error"
}

module.exports = {
  collections, firebaseWhere, userRoutes, weekDay, status
}