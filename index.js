const express = require("express");

const path = require("path");

const moment = require("moment");

const member = require("./Member");

const app = express();

//middleware use garam aaba
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }:${moment().format()}`
  );
  //   console.log("hello");
  next();
};
//inorder to initialize middleware we use .us
//init middleware
app.use(logger);

// this routes gets all the members
app.get("/api/member", (req, res) => {
  // no need to do jason stringify like in node.
  res.json(member);
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));

//   //   res.send(" <h1>hello world!!!</h1>");
// });

// set static folder
//.use lae middleware use garxa
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000; //port number environment variable ma check garxa yedi xaina vane 3000 ma load hunxa
// const PORT = 3000;

app.listen(PORT, () => console.log(`the server is runnin at port ${PORT}`));
