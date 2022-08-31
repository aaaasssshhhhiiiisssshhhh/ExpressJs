const express = require("express");

const path = require("path");

const logger = require("./middleware/logger");

const app = express();

//inorder to initialize middleware we use .us
//init middleware
// app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //handel urlencoded data (form sumbission)

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));

//   //   res.send(" <h1>hello world!!!</h1>");
// });

// set static folder
//.use lae middleware use garxa
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/member", require("./routes/api/member"));

const PORT = process.env.PORT || 3000; //port number environment variable ma check garxa yedi xaina vane 3000 ma load hunxa
// const PORT = 3000;

app.listen(PORT, () => console.log(`the server is runnin at port ${PORT}`));
