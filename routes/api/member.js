const express = require("express");
const uuid = require("uuid");
const router = express.Router();
//const member = require("./Member"); form index.js
const member = require("../../Member");

// this routes gets all the members
// app.get("/api/member", (req, res) => {
//app ko thau ma router
// /api/member/ index.js ma define gari sake ko xa so use /
router.get("/", (req, res) => {
  // no need to do jason stringify like in node.
  res.json(member);
});

//get single member
// app.get("/api/member/:id", (req, res) => {
//app ko thau ma router

// /api/member/ index.js ma define gari sake ko xa so use /

//get request
router.get("/:id", (req, res) => {
  //   res.send(req.params.id);

  const found = member.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    //req.params.id string ma and member.id is number so we have to do parsInt
    //filter method lae array lai linxa ani filter out garxa
    res.json(member.filter((member) => member.id === parseInt(req.params.id)));
    return;
  } else {
    res
      .status(400)
      .json({ msg: `no member with id : ${req.params.id}  found ` });
  }
});

//create member

router.post("/", (req, res) => {
  //   res.send(req.body);

  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    satus: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: `please enter email and id` });
  }
  member.push(newMember);
  // res.json(member);
  res.redirect("/");
});

//upadte memeber
//put req
router.put("/:id", (req, res) => {
  const found = member.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    member.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name == updMember.name ? updMember.name : member.name;
        member.email == updMember.email ? updMember.email : member.email;

        res.json({
          msg: `member updated `,
          member,
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `no member with id : ${req.params.id}  found ` });
  }
});

//delete member
router.delete("/:id", (req, res) => {
  const found = member.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `member deleted`,
      member: member.filter((member) => member.id !== parseInt(req.params.id)),
    });
    return;
  } else {
    res
      .status(400)
      .json({ msg: `no member with id : ${req.params.id}  found ` });
  }
});

module.exports = router;
