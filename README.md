# Papayatary

> Fitness Dating Mobile App

## Introduction

> Papaytary is a React Native mobile app that allows users to like one another by sending Fitbit steps. Users sync up steps they've accumulated while wearing their Fitbit. New steps are added to users' wallets each time they open the mobile app. Users can then send steps to other users in order to like them. Once two users send steps to each other, they are matched and can send each other messages.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Example

![papayatary5](https://cloud.githubusercontent.com/assets/14812931/15437240/e5c48090-1e7a-11e6-8ec3-d1ee2a576b32.gif)

## Technologies
##### Back End
- Node/Express
- PostgreSQL
- Sequelize
- Socket.io

##### Front End
- React Native
- Redux

##### Testing
- Chai
- Mocha

### Wireframes
<img width="1027" alt="screen shot 2016-05-19 at 2 27 35 pm" src="https://cloud.githubusercontent.com/assets/14812931/15410755/6513fbec-1dd0-11e6-88e1-df928af87283.png">

### Installation
- Fork and clone both repositories.(https://github.com/cosmictornado/cosmictornado) (https://github.com/cosmictornado/cosmicServer)
- Install PostgreSQL following this tutorial (https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql)
- ```npm install``` in root of both directories.
- ```nodemon server.js``` to start the server and link the tables to the database

### Database Setup
In the terminal, navigate to the root directory of the server repository:
- ```createdb _databasename_``` to create a database
- To seed the database from csv files for testing purposes:
  - ```psql _databasename_``` to go to the PosgreSQL command line
  - ```COPY users FROM '../../../../Path/To/File/Relative/To/psql/Location/users.csv' ( FORMAT CSV, DELIMITER(',') );``` 

### PostgreSQL Command Cheatsheet
- ```createdb _databasename_``` to create a new database called databasename
- ```dropdb _databasename_``` to delete an existing database
- ```psql _databasename_``` to enter PostgreSQL command line
- ```\list``` to list all databases
- ```\connect``` to switch databases
- ```\dt``` to show all tables
- ```\q``` to exit psql command line
- ```\d _tablename_``` to show table column names
- ```SELECT * from _tablename_;``` to show all rows in a table
- ```\t``` to toggle table to show column names if they're not showing up

### Schema Design
<img width="1023" alt="screen shot 2016-05-19 at 2 56 48 pm" src="https://cloud.githubusercontent.com/assets/14812931/15411224/673af13e-1dd3-11e6-8b0a-c0db47e9b59c.png">

### High level architecture
![](http://i.imgur.com/eCUkBBx.png)

### Testing
- In terminal, ```mocha``` to run tests

### Installing Dependencies
- ```npm install```
- ```rnpm link``` to automatically link most iOS dependencies

### Roadmap
View the project roadmap [**here**](https://waffle.io/cosmictornado/cosmictornado).
Papayatary was built using waffle.io as the project organization tool.

### Team
  - __Product Owner__: [**Haoming Huang**](https://github.com/haomingh)
  - __Scrum Master__: [**Laura Curley**](https://github.com/lauracurley)
  - __Development Team Members__: [**Kenneth Montgomery**] (https://github.com/BigBroken)

### Contributing
Learn how to contribute [**here**](https://github.com/cosmictornado/cosmicServer/blob/master/CONTRIBUTING.md).

### Questions and Issues
For any issues, please refer to [**our issues page**](https://github.com/cosmictornado/cosmicServer/issues).
Please direct any questions regarding Papayatary to [**our wiki page**](https://github.com/cosmictornado/cosmicServer/wiki).

### License
Distributed under the MIT License.

