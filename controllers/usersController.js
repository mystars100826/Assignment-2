const User = require('../models/user');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const data = users.map((user) => ({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    }));

    res.status(200).json({
      success: true,
      message: 'Users list retrieved successfully.',
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User added successfully.',
      data: {
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        email: savedUser.email,
        id: savedUser._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};