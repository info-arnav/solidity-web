require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");

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
    },
  },
  solidity: "0.8.18",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: { enabled: true, outputFile: "gas-report.txt", noColors: true },
};
