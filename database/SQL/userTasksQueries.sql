USE Task_Management_System;
-- to get all tasks
select *
from task
where userID = ?;
-- to get a single task
select *
from task
where userID = ?
    and taskID = ?;
-- to create a task
insert into task (taskID, taskName, taksDetails, userID)
values (?, ?, ?, ?);
-- to update a task
update task
set taskID = ?,
    taskName = ?,
    taksDetails = ?,
    userID = ?;
-- to delete a task
delete from task
where taskID = ?
    and userID = ?;