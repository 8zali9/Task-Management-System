// workGroup queries

// @desc    get all workGroups of a user
const qGetAllworkGroupsOfUser = `
    SELECT *
    FROM workgroup
    WHERE 
      workGroupID = ?
      and workGroupLeadID = ?
`;

// @desc    get a workGroup of a user
const qGetAworkGroupOfUser = `
    SELECT *
    FROM workgroup
    WHERE 
      workGroupLeadID = ?
`;

// @desc    create a workGroup
const qCreateworkGroup = `
    insert into workgroup (workGroupName, workGroupMotive, workGroupLeadID)
    values (?, ?, ?)
`;

// @desc    update workGroup's info
const qUpdateworkGroup = `
    update workgroup
    set 
      workGroupName = ?,
      workGroupMotive = ?
    where 
      workGroupID = ?
      and
      workGroupLeadID = ?    
`;

// @desc    delete workGroup
const qDeleteworkGroup = `
    delete from workgroup
    where 
      workGroupID = ?
      and
      workGroupLeadID = ?
`;

module.exports = {
  qGetAllworkGroupsOfUser,
  qGetAworkGroupOfUser,
  qCreateworkGroup,
  qUpdateworkGroup,
  qDeleteworkGroup,
};
