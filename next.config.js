/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "http://localhost:3000/api/v1",
    DB_HOST: "localhost",
    DB_USER: "root",
    DB_PASSWORD: "prince",
    DB_NAME: "scheduler",
    DB_PORT: 3307,
    SMTP_HOST: "smtp.zoho.com",
    SMTP_PORT: 465,
    EMAIL_USERNAME: "support@umopay.com",
    EMAIL_PASSWORD: "Softmasters@2022",
  },
};

module.exports = nextConfig;
