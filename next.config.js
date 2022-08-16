/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "http://localhost:3000/api/v1",
    DB_HOST: "localhost",
    DB_USER: "root",
    DB_PASSWORD: "",
    DB_NAME: "schedular",
    DB_PORT: 3306,
    SMTP_HOST: "smtp.mail.yahoo.com",
    SMTP_PORT: 465,
    EMAIL_USERNAME: "chris.debrah@yahoo.com",
    EMAIL_PASSWORD: "fxvcgkctoipwdsmk",
  },
};

module.exports = nextConfig;
