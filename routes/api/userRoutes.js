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

// http://localhost:3001/api/users/
router.route("/").get(getUsers).post(createUser);

// http://localhost:3001/api/users/1
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// http://localhost:3001/api/user/:userid/friends/friendsid
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
