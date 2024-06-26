module.exports = {
  apps: [
    {
      name: "node-api",
      script: "npm",
      args: "start",
      time: true,
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
