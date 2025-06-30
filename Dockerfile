FROM node:20.13.1

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update && apt-get install -y \
    libc6 \
    libc6-dev

COPY . .
# Pastikan ini ada:
COPY prisma/ ./prisma/

RUN npm install
RUN npx prisma generate

EXPOSE 5000

# Jalankan script start (lihat bawah)
CMD ["sh", "./start.sh"]
