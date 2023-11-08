CREATE DATABASE Task_Management_System;
USE Task_Management_System;

CREATE TABLE accountUser
(
    userID int primary key,
    userName varchar (30),
    userEmail varchar(20),
    userPassword varchar(30)
);

CREATE TABLE task
(
    taskID int primary key,
    taskName varchar(20),
    taskDetails varchar(100),
    userID int,
    foreign key (userID) references accountUser(userID)
);

CREATE TABLE team
(
    teamID int primary key,
    teamName varchar(30),
    teamMotive varchar(100),
    teamLeadID int,
    foreign key (teamLeadID) references accountUser(userID)
);

CREATE TABLE link
(
    userID int,
    teamID int,
    primary key (userID, teamID),
    foreign key (userID) references accountUser(userID),
    foreign key (teamID) references team(teamID)
);