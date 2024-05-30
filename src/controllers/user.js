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
      response(400, 'error', 'User already exist');
    }

    // cek password dan repassword sama atau ngga
    if (password !== repassword) {
      response(400, 'error', `Password doesn't match`);
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

    //cek email dan password tersedia atau tidak
    if (!email || !password) {
      return response(404, 'error', 'Email and password are required', res);
    }

    //cek email dan password sesuai atau tidak
    const user = await findUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return response(401, 'error', 'Invalid email or password', res);
    }

    // create token for user
    let token = generateTokenAndCookie(user.id, res);

    //respon saat login berhasil
    const userData = {
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    response(200, userData, 'User success login', res);
  } catch (error) {
    console.log(error.message);
    response(500, 'invalid', 'error when login user', res);
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
