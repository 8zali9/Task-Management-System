# User Task Management API

This is a simple Node.js API for managing user tasks in a database. It allows you to perform various operations such as creating, reading, updating, and deleting tasks for specific users.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Database](#database)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization.
- Create, read, update, and delete tasks for specific users.
- Error handling for various scenarios.
- Secure user authentication using tokens.
- MySQL database for data storage.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following software installed:

- Node.js
- MySQL Server
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/user-task-management-api.git


Navigate to the project directory:
cd user-task-management-api

Install dependencies:
npm install

Create a .env file in the project root and configure the following environment variables:
PORT=2525
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name


Initialize the database schema by executing the SQL script provided in schema.sql.


Start the application:
npm start

The application will run on the specified port (default: 2525).

----------------------------------------------------------------------

Usage
You can use this API to create, read, update, and delete tasks for specific users. It also provides user authentication and authorization for secure access.

For detailed API documentation and endpoints, please refer to the Endpoints section.

Endpoints
POST /api/user/signin: Authenticate and log in a user.

POST /api/user/signout: Log out or sign out a user.

GET /api/user/:id: Get user details by userID.

POST /api/user: Create/register a user.

PUT /api/user/:id: Update user details.

DELETE /api/user/:id: Delete a user.

GET /api/usertasks/:uid: Get all tasks of a user.

GET /api/usertasks/:uid/:tid: Get a single task of a user.

POST /api/usertasks/:uid: Create a task.

PUT /api/usertasks/:uid/:tid: Update a task.

DELETE /api/usertasks/:uid/:tid: Delete a task.

Database
This application uses a MySQL database to store user and task data. The database schema and tables are defined in the schema.sql file. You should set up the database and configure the connection details in the .env file.

Error Handling
The application includes error handling to provide informative responses in case of errors. Custom error middleware is used to handle different error scenarios.

Contributing
Contributions are welcome! If you'd like to contribute to this project, please open an issue, create a pull request, or contact the project maintainers for more information.

License
This project is licensed under the MIT License - see the LICENSE file for details.
```

Follow the given below link to know how the documentation & README.md files were made with ChatGPT:

```bash
https://chat.openai.com/share/000115eb-da64-4277-921a-5832403e3bb8

```
