const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("fundMe", async () => {
  let FUND_ME;
  let DEPLOYER;
  let MOCKV3AGGREGATOR;
  beforeEach(async () => {
    DEPLOYER = await (await getNamedAccounts()).deployer;
    await (await deployments).fixture(["all"]);
    FUND_ME = await ethers.getContract("FundMe", DEPLOYER);
    MOCKV3AGGREGATOR = await ethers.getContract("MockV3Aggregator", DEPLOYER);
  });

  describe("constructor", async () => {
    it("sets the aggrator address correctly", async () => {
      const address = await FUND_ME.PRICE_FEED;
      const mock_address = await MOCKV3AGGREGATOR.address;
      assert.equal(address, mock_address);
    });
  });
});
