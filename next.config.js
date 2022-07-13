const nextConfig = {
  distDir: 'build',

  httpAgentOptions: {
    keepAlive: true,
  },

  // reactStrictMode: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_COLOR: process.env.APP_COLOR,
    URL: process.env.URL,
    JLINX_HOST: process.env.JLINX_HOST,
    // JLINX_VAULT_KEY: process.env.JLINX_VAULT_KEY,
    // SESSION_SECRET: process.env.SESSION_SECRET,
    // DATABASE_URL: process.env.DATABASE_URL,
  }
}

module.exports = nextConfig
