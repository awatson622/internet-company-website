# internet-company-website

## Description
This project is a functional Express.js API that utilizes Sequelize as an ORM for connecting to a MySQL database. It provides routes for managing categories, products, and tags through GET, POST, PUT, and DELETE requests.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologiesUsed)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features
Seamless integration with MySQL database.
CRUD operations for categories, products, and tags.
JSON formatting of data for easy consumption.
Environment variable-based configuration for database connection.


## Technologies Used
Express.js
Sequelize
MySQL
Node.js


## Installation 
Clone the repository.
Navigate to the project directory.
Install dependencies by running npm install.


## Usage
Create a .env file in the root directory of the project.
Add the following environment variables:
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
Ensure MySQL server is running.
Run the following commands in the terminal:
npm run schema
npm run seed
Start the server by running:
npm start
Test the API routes using Insomnia Core.


## License
This project is licensed under the MIT License.
