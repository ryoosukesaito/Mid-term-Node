const router = require("express").Router();
const uuid = require("uuid");

const userAdmin = [
  { _id: uuid.v4(), name: "admin", email: "admin@example.com" },
];

router.get('')