use task_management_system;

-- get all workGroups of a user
select * from workGroupMembership
where userID = 1;

-- get a workGroup of a user
select * from workGroupMembership
where userID = 1 and workGroupID = 1;

-- create a workGroup
insert into workGroup ()

