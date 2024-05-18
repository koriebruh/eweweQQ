const bcrypt = require('bcryptjs');

const response = require('../response');
const { findUsers, findUserByEmail, addUser } = require('../models/userModel');

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

module.exports = { getAllUsers, signupUser };
