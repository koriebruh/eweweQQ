const prisma = require('../db/index');

// query nampilin semua user (select all user)
const findUsers = async () => {
  const users = await prisma.Users.findMany();

  return users;
};

const findUserByEmail = async (email) => {
  const user = await prisma.Users.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const addUser = async (userData) => {
  const user = await prisma.Users.create({ data: userData });

  return user;
};

module.exports = { findUsers, addUser, findUserByEmail };
