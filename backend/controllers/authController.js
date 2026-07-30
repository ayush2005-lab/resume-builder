const User = require("../models/User");
const generateToken = require("../utils/generateToken");

function toPublicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

async function register(req, res) {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: "An account with this email already exists" });

  const user = await User.create({ name, email, password });
  res.status(201).json({ ...toPublicUser(user), token: generateToken(user._id) });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ ...toPublicUser(user), token: generateToken(user._id) });
}

async function me(req, res) {
  res.json(toPublicUser(req.user));
}

async function updateProfile(req, res) {
  if (req.body.name) req.user.name = req.body.name;
  await req.user.save();
  res.json(toPublicUser(req.user));
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const matches = await user.matchPassword(currentPassword);
  if (!matches) return res.status(401).json({ message: "Current password is incorrect" });
  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated" });
}

module.exports = { register, login, me, updateProfile, changePassword };
