#!/bin/sh

# Jalankan migration setelah env tersedia
npx prisma migrate deploy

npm run seed

# Jalankan server
npm run start
