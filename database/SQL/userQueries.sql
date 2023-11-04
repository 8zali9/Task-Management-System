-- to get a single user
SELECT *
FROM userAccount
WHERE userID = ?;
-- to create a user
insert into userAccount (userID, userName, userEmail, userPassword)
values (?, ?, ?, ?);
-- to update user credentials
update userAccount
set userID = ?,
    userName = ?,
    userEmail = ?,
    userPassword = ?;
-- to delete a user
delete from userAccount
where userID = ?
    and userPassword = ?;