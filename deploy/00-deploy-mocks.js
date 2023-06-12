const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (developmentChains.indexOf(chainId.toString()) != -1) {
    log("Local network detected.");
    log("Deploying mocks........");
    await deploy("MockV3Aggregator", {
      cotract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log("Mocks deployed");
    log("________________________________________");
  }
};

module.exports.tags = ["all", "mocks"];
