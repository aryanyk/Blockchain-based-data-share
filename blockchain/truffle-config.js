module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Default Ganache GUI port
      network_id: "*",
      gas: 8000000, // Increase gas limit
      gasPrice: 20000000000,
      networkCheckTimeout: 10000,
      timeoutBlocks: 200
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};