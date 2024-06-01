const bcrypt = require('bcryptjs');
const response = require('../response');

const { findUsers, findUserByEmail, addUser } = require('../models/Users');
const generateTokenAndCookie = require('../utils/generateTokenAndCookie');

const getAllUsers = async (req, res) => {
  try {
    const users = await findUsers();

    response(200, users, 'Success get all users', res);
  } catch (error) {
    response(500, 'invalid', 'error', res);
    console.log(error.message);
  }
};

const signupUser = async (req, res) => {
  try {
    // Ambil property yang ada di body/yang dikirim dari frontend
    const { username, email, password, repassword } = req.body;

    // cek apakah user udah ada di database
    const user = await findUserByEmail(email);

    if (user) {
      return response(400, 'error', 'User already exist', res);
    }

    // cek password dan repassword sama atau ngga
    if (password !== repassword) {
      return response(400, 'error', `Password doesn't match`, res);
    }

    // encrypt password jika semua proses cek berhasil
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // sent data user ke db
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    await addUser(newUser);

    response(201, newUser, 'Success add user', res);
  } catch (error) {
    response(500, 'invalid', 'error when signup', res);
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return response(400, 'error', 'Email and password are required', res);
    }

    // Find user by email
    const user = await findUserByEmail(email);

    // Check if user exists
    if (!user) {
      return response(
        404,
        'user not found',
        'User does not exist, please sign up',
        res
      );
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response(401, 'error', 'Invalid email or password', res);
    }

    // Create token for user
    let token = generateTokenAndCookie(user.id, res);

    // Response when login is successful
    const userData = {
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    return response(200, userData, 'User successfully logged in', res);
  } catch (error) {
    console.log(error.message);
    return response(500, 'invalid', 'Error when logging in user', res);
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    response(200, 'success', 'Logout successful', res);
  } catch (error) {
    response(500, 'error', 'Internal Server Error when logout', res);
    console.log(error.message);
  }
};

module.exports = { getAllUsers, signupUser, loginUser, logoutUser };
