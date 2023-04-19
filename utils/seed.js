const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  for (let i = 0; i < 20; i++) {
    var new_user = new User({
      username: getRandomUser(),
    });

    new_user.save();
  }

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
