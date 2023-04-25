const { User, Thought } = require("../models");

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .populate("friends")
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    console.log(req.params);
    User.findOne({ _id: req.params.id })
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
    User.findOneAndDelete({ _id: req.params.id })
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User with that ID" })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a friend
  addFriend(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user) {
          user.friends.push(req.params.id);
          user.save();
          res.json(user);
        } else {
          res.status(404).json({ message: "No user with this id!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //remove a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.id } },
      { new: true }
    )
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
