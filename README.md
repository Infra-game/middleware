# InfraGame MiddleWare

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)

This is the bridge between the website and our backend, it allow data transmission (user data, game data, etc..) between both 


## Start  
The MiddleWare is always started, you don't have to start it. 

To run the code, you should use on terminal 
```bash 
npm start
```


## Made with

* [Visual Studio Code](https://code.visualstudio.com/) - Text editor
* [Node JS](https://nodejs.org/en/) - Node.js is a free software platform in JavaScript
* [Express JS](https://expressjs.com/fr/) - Express.js is a framework for building web applications based on Node.js.

## API ENDPOINT
| Routes                   | Type   | Parameter                                                      | Retour type | Accès user | Accès admin |
| ------------------------ | ------ | -------------------------------------------------------------- | ----------- | ---------- | ----------- |
| /logout                  | GET    |                                                                |             | YES        | YES         |
| /register                | POST   |                                                                |             | YES        | YES         |
| /login                   | POST   | email , username , password , fullName , role                  |             | YES        | YES         |
| /isAuth                  | GET    | authenticateJWT                                                |             | YES        | YES         |
| /games/:gameName/start   | GET    |                                                                |             | YES        | YES         |
| /games/:gameName/status  | GET    |                                                                |             | YES        | YES         |
| /games/:gameName/destroy | GET    |                                                                |             | YES        | YES         |
| /monitoring/disk         | POST   | Points , after                                                 | JSON        | YES        | YES         |
| /monitoring/ram          | GET    | Points , after                                                 | JSON        | YES        | YES         |
| /monitoring/load         | POST   | Points , after                                                 | JSON        | YES        | YES         |
| /monitoring/cpu          | POST   | Points , after                                                 | JSON        | YES        | YES         |
| /feedback/bugreport      | POST   | bugtype , bugmessage                                           |             | YES        | YES         |
| /feedback/pendingBug     |        |                                                                | JSON        | YES        | YES         |
| /users                   | GET    |                                                                | JSON        | NO         | YES         |
| /users/add               | POST   | email , username , password , fullName , role                  |             | NO         | YES         |
| /users/:id               | DELETE | authenticateJWT                                                |             |            |             |
| /users/:id               | PUT    | authenticateJWT , email , username, password , fullName , role | JSON        | NO         | YES         |

## Versions

**Latest stable release :** 

**Latest release :** 


## Contributors 

* **Stephane DUBOZE** _alias_ [@Black-Thor](https://github.com/Black-Thor)
* **John-Kenneth TAYLOR AFONAH** _alias_ [@KenTay198](https://github.com/KenTay198)
* **Mohamed Mehdi GUEMIDI** _alias_ [@Diabet0](https://github.com/Diabet0)
* **Idris MEZNAD** _alias_ [@mezdidis](https://github.com/mezdidis)


## Author

* **Idris MEZNAD** _alias_ [@mezdidis](https://github.com/mezdidis)
