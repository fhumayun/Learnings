var express = require("express");
var router = express.Router();
const users = require("../Users");

/* GET all users */
router.get("/", function(req, res, next) {
  //res.send('respond with a resource');
  res.json(users);
});

/* Get users by id */
router.get("/:id", function(req, res, next) {
  //console.log(req.params);
  if (users.some(user => user.id === parseInt(req.params.id))) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res
      .status(404)
      .json({ msg: `No user with id of ${req.params.id} was found` });
  }
});
/* Update users by id */
router.put("/:id", function(req, res, next) {
  //console.log(req.params);
  if (users.some(user => user.id === parseInt(req.params.id))) {
    //res.json(users.filter(user => user.id === parseInt(req.params.id)));
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email ? req.body.email : user.email;
        user.department = req.body.department
          ? req.body.department
          : user.department;

        res.json({ user });
      }
    });
  } else {
    res
      .status(404)
      .json({ msg: `No user with id of ${req.params.id} was found` });
  }
});

/* Create a new user in an array since I don't interface with a database*/
router.post("/", function(req, res, next) {
  const newUser = {
    id: 3,
    name: req.body.name,
    email: req.body.email,
    department: req.body.department
  };

  if (!newUser.name || !newUser.email) {
    return res
      .status(400)
      .json({ msg: `Please include name, email and department` });
  }

  users.push(newUser);
  res.status(201).json(users);
});

/* Delete users by id */
router.delete("/:id", function(req, res, next) {
  //console.log(req.params);
  if (users.some(user => user.id === parseInt(req.params.id))) {
    res.json({
      users: users.filter(user => user.id !== parseInt(req.params.id))
    });
  } else {
    res
      .status(404)
      .json({ msg: `No user with id of ${req.params.id} was found` });
  }
});

module.exports = router;
