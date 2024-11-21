const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user.js');  // Assuming mongoose schema is set

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", 'ejs');

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Display all users
app.get("/read", async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.render("read", { createdUser: users });  // Pass the users array to the view
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching users");
  }
});
app.get("/edit/userid", async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.render("read", { createdUser: users });  // Pass the users array to the view
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching users");
  }
});

// Create a new user
app.post("/create", async (req, res) => {
  try {
    const { name, email, image } = req.body;
    console.log(email)
    const createdUser = await User({
      name: name,
      email: email,
      image: image,
    });

    console.log(createdUser);
    res.redirect("/read");  // Redirect to /read after creating a user
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
