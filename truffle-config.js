require('dotenv').config();
var HDWalletProvider = require("@truffle/hdwallet-provider");
var url = process.env["URL"];
var privateKey = process.env["ACCOUNT"];

module.exports = {
  networks: {  
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    rinkeby:{
      host: "localhost",
      provider: function() {
        return new HDWalletProvider(privateKey, url);
      },
      
      network_id:4,           
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.12",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
