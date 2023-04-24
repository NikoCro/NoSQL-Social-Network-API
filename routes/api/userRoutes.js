const express = require("express");
const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
