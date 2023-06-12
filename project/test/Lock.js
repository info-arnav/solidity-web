const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let SimpleStorage, SimpleStorageFactory;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should have initial value 10", async () => {
    let number = await (await SimpleStorage).readNumber();
    let expected = "10";
    assert.equal(number.toString(), expected);
  });
});
