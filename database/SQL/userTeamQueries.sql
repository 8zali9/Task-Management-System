use task_management_system;

-- get all workGroups of a user
select * from workGroupMembership
where userID = 1;

-- get a workGroup of a user
select * from workGroupMembership
where userID = 1 and workGroupID = 1;

-- create a workGroup
insert into workGroup (workGroupName, workGroupMotive, workGroupLeadID)
values ("wg", "aesi ji", 2);

-- Update workGroup
UPDATE workGroup
SET workGroupName = 'newName', workGroupMotive = 'newMotive'
WHERE workGroupID = 2 AND workGroupLeadID = (
    SELECT workGroupLeadID FROM (SELECT * FROM workGroup) AS temp
    WHERE workGroupID = 2
);

-- delete a workGroup
delete from workGroup
WHERE workGroupID = 3 AND workGroupLeadID = (
    SELECT workGroupLeadID FROM (SELECT * FROM workGroup) AS temp
    WHERE workGroupID = 3
);

-- adding users to the group