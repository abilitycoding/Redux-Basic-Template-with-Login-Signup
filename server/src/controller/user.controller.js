const router = require("express").Router();
const userDataModel = require("../model/user.model");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // return;
  userDataModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid username" });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      return res
        .status(200)
        .json({ message: "Login successful", loginData: user.email });
    })
    .catch(() => res.status(500).json({ error: "Internal server error" }));
});

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  // return;
  userDataModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new userDataModel({
          username,
          email,
          password
        });
        newUser
          .save()
          .then(() => {
            res.send({ message: "Successfully registered" });
          })
          .catch((err) => {
            console.log(err);
            res.send({ message: "An error occurred" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "An error occurred" });
    });
});

router.get("/req-get", async (req, res) => {
  const data = await userDataModel.find();
  res.send(data);
});

router.get("/req-get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const find_one = await userDataModel.findById(id);
    res.send(find_one);
  } catch (err) {
    res.send(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { userName, email, phoneNumber, password, profileUrl } = req.body;
  console.log(req.body);
  try {
    await userDataModel.findByIdAndUpdate(id, {
      userName,
      email,
      phoneNumber,
      password,
      profileUrl
    });
    res.send("Data Updated");
  } catch (err) {
    res.send(err);
  }
});

router.delete("/req-delete/:id", async (req, res) => {
  const id = req.params.id;
  userDataModel
    .findByIdAndRemove(id)
    .then(() => {
      res.send("Data Deleted");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
