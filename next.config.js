/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  env: getEnvConfig(),
};

function getEnvConfig() {
  const environment = process.env.TARGET_ENV || process.env.NODE_ENV;
  try {
    return require(`./env-${environment}.json`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return require("./env-development.json");
  }
}
