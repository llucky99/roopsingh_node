const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signToken } = require("../utils/jwt");

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

const hashedPassword = await bcrypt.hash(password, 12);
const user = await User.create({ name, email, password: hashedPassword });
const token = signToken({ userId: user._id.toString() });

return {user: { _id: user._id, name: user.name, email: user.email }, token };

}

async function login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");

if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
}
const token = signToken({ userId: user._id.toString() });
return { user: { _id: user._id, name: user.name, email: user.email }, token };
}

module.exports = { register, login };