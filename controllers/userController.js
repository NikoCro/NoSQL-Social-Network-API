const { User, Thought } = require("../models");

module.exports = {
  // Get all Users
  getUser(req, res) {
    Course.find()
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select("-__v")
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User with that ID" })
          : Student.deleteMany({ _id: { $in: User.students } })
      )
      .then(() => res.json({ message: "User and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
