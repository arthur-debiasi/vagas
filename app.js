require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const teste1 = require("./teste1");
const teste2 = require("./teste2");
const teste3 = require("./teste3");
const teste4 = require("./teste4");
const teste5 = require("./teste5");
const teste6 = require("./teste6");
const auth = require('./middlewares/auth');
const { validateQueryName, validateNameJob, validateQueryId, validateLogin } = require('./middlewares/validateFields');

const port = process.env.PORT || 3000;


app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(_req, res) {
  res.send(`GET /user</br>
  GET /users</br>
  POST /users</br>
  DELETE /users</br>
  PUT /users</br>
  POST /login</br>`);
});


app.get("/user", validateQueryName, teste1.getUser);
app.get("/users", teste1.getUsers);
app.post("/users", validateNameJob, teste2)
app.delete("/users", auth, validateQueryName, teste3)
app.put("/users", auth, validateQueryId, teste4)
app.get("/users/access", validateQueryName, teste5);
app.post("/login", validateLogin, teste6);


app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
