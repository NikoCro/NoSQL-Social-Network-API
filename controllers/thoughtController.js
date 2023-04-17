const { Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Course.find()
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.ThoughtId })
      .select("-__v")
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => res.json(Thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : Student.deleteMany({ _id: { $in: User.students } })
      )
      .then(() => res.json({ message: "User and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
