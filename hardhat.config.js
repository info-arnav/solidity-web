require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

SEPOLIA_PROVIDER = process.env.SEPOLIA_PROVIDER;
PRIVATE_KEY = process.env.PRIVATE_KEY;
ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_PROVIDER,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  solidity: {
    compilers: [
      { version: "0.8.18" },
      { version: "0.8.7" },
      { version: "0.8.0" },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: { enabled: true, outputFile: "gas-report.txt", noColors: true },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
