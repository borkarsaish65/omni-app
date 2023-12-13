const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const sequelize = require('sequelize');
const Sequelize = require('./src/services/db');

const userModel = require('./src/model/user')(Sequelize,sequelize);

app.get("/", (req, res) => res.type('html').send(html));

app.get("/users",async (req, res) => {

    let result = await userModel.findAll();


    res.status(200).send({
        result
    })

});


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Saish!</title>
  </head>
  <body>
    <section>
      Hello from Saish!
    </section>
  </body>
</html>
`

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
