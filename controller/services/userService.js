const User = require('../../model/user');

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  Object.keys(updateData).forEach((key) => {
    user[key] = updateData[key];
  });

  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
