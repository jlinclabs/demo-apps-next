const nextConfig = {
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

if (process.env.NODE_ENV === 'development'){
  nextConfig.distDir = `build/${process.env.APP_NAME}`
}

module.exports = nextConfig
