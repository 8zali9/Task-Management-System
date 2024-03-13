// user tasks queries

// @desc    get all tasks
const qGetAllTasks = `
    select *
    from task
    where userID = ?
`;

// @desc    get a single task
const qGetTask = `
    select *
    from task
    where userID = ?
        and taskID = ?
`;

// @desc    add a task
const qAddTask = `
    insert into task (taskName, taskDetails, priority, deadline, userID)
    values (?, ?, ?, ?, ?)
`;

// @desc    update a task
const qUpdateTask = `
    update task
    set taskID = ?,
        taskName = ?,
        taskDetails = ?,
        userID = ?
`;

// @desc    delete a task
const qDeleteTask = `
    delete from task
    where taskID = ?
        and userID = ?
`;

module.exports = {
  qGetAllTasks,
  qGetTask,
  qAddTask,
  qUpdateTask,
  qDeleteTask,
};
