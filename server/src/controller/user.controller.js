const router = require("express").Router();
const userDataModel = require("../model/user.model");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // return;

  try {
    const user = await userDataModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res
      .status(200)
      .json({ message: "Login successful", loginData: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  try {
    const existingUser = await userDataModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newUser = new userDataModel({
      username,
      email,
      password
    });

    await newUser.save();
    return res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
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
