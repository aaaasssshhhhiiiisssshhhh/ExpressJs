const express = require("express");

const path = require("path");

const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");

const member = require("./Member");

const app = express();

//inorder to initialize middleware we use .us
//init middleware
// app.use(logger);

//handelbars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //handel urlencoded data (form sumbission)

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));

//   //   res.send(" <h1>hello world!!!</h1>");
// });

//route for handlebars (home page route)
app.get("/", (req, res) => {
  res.render("index", {
    title: "member app",
    // member: member,
    //or
    member,
  });
});

// set static folder
app.use(express.static(path.join(__dirname, "public")));
//.use lae middleware use garxa
app.use("/api/member", require("./routes/api/member"));

const PORT = process.env.PORT || 3000; //port number environment variable ma check garxa yedi xaina vane 3000 ma load hunxa
// const PORT = 3000;

app.listen(PORT, () => console.log(`the server is runnin at port ${PORT}`));
