const { network } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");
const verify = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;

  let ethUsdPriceConverter;

  if (developmentChains.indexOf(chainId.toString()) != -1) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceConverter = ethUsdAggregator.address;
  } else {
    ethUsdPriceConverter = await networkConfig[chainId]["ethUsdPriceConverter"];
  }

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceConverter],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log("________________________________________");

  const address = await fundMe.address;

  if (developmentChains.indexOf(chainId.toString()) == -1) {
    await verify(address, [ethUsdPriceConverter]);
  }
};

module.exports.tags = ["all", "fundme"];
