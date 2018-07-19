# React Quiz
You may find hosted application here:
[https://react-quiz-3496c.firebaseapp.com/](https://react-quiz-3496c.firebaseapp.com/)

## Task
Develop a quiz app (using react and node.js), which is aimed to test your fellow developers.

Functional and nonfunctional requirements are to be chosen by yourself, but keep in mind that we will judge you (J) based on your priorities:
- Did you prioritize UI/UX or tests.
- Did you prioritize functionality or clean code.
- What was your approach to CRUD and data storage in general.
- Etc.

Practical requirements:
- We would like to get a link to your source code in GitHub.
- Working app – please host it somewhere.

## What has been done
React Quiz application was created.
Quiz questions are loaded from the node.js server.
After finishing quiz, answers are sent to backend and result with correct and wrong question counts is returned and displayed to the user.
Different types of tests has been written for components, actions, async actions and reducers.

## Run the application
(Tested on npm 6.1.0 and node v8.11.2)

### Install dependencies
```sh
npm install
```

### Run node.js server
```sh
npm run server
```

### Run react application
```sh
npm start
```

### Run tests
```sh
npm run test
```
And then type `a` to start all tests
