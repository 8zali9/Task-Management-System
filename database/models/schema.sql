CREATE DATABASE Task_Management_System;
USE Task_Management_System;

CREATE TABLE accountUser
(
    userID int primary key auto_increment,
    userName varchar (30),
    userEmail varchar(20),
    userPassword varchar(30)
);

CREATE TABLE workGroup
(
    workGroupID int primary key auto_increment,
    workGroupName varchar(30),
    workGroupMotive varchar(100),
    workGroupLeadID int,
    foreign key (workGroupLeadID) references accountUser(userID)
);

CREATE TABLE task
(
    taskID int primary key auto_increment,
    taskName varchar(20),
    taskDetails varchar(100),
    userID int,
    foreign key (userID) references accountUser(userID),
    workGroupID int,
    foreign key (workGroupID) references workGroup(workGroupID)
);

CREATE TABLE workGroupMembership
(
	workGroupMembershipID int primary key auto_increment,
    userID int,
    workGroupID int,
    foreign key (userID) references accountUser(userID),
    foreign key (workGroupID) references workGroup(workGroupID)
);
