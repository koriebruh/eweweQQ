const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const response = require('../response');
const SECRET_KEY = 'bingungisiapa';

const { findUsers, findUserByEmail, addUser } = require('../models/Users');

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
    response(500, 'invalid', 'error', res);
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //cek email dan password tersedia atau tidak
    if (!email || !password) {
      return response(400, 'error', 'Email and password are required', res);
    }

    const user = await findUserByEmail(email);
    //cek email dan password sesuai atau tidak
    if (!user) {
      return response(401, 'error', 'Invalid email or password', res);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      response(401, 'error', 'error', 'Invalid email or password', res);
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    //respon saat login berhasil
    response(
      200,
      { token, userId: user.id, username: user.username, email: user.email },
      'Success login',
      res
    );
  } catch (error) {
    response(500, 'invalid', 'error', res);
    console.log(error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    // asumsi kita menggunakan token invalid
    // const token = req.headers.authorization.split(' ')[1];
    // if (!token) {
    //   return response(400, 'error', 'Token is required', res);
    // }

    // add token ke blacklist
    //blacklistToken(token);
    res.clearCookie('token');
    response(200, 'success', 'Logout successful', res);
  } catch (error) {
    response(500, 'error', 'Internal Server Error', res);
    console.log(error.message);
  }
};

module.exports = { getAllUsers, signupUser, loginUser, logoutUser };
