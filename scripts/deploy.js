const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFacory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract.....");
  const SimpleStorage = SimpleStorageFacory.deploy();
  (await SimpleStorage).deployed();
  console.log(`Deployed contract at ${(await SimpleStorage).address}`);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    const reciept = await (await SimpleStorage).deployTransaction.wait(6);
    await verify((await SimpleStorage).address, []);
  }
  let number = await (await SimpleStorage).readNumber();
  console.log(`Current Number: ${number}`);
  const numberChange = await (await SimpleStorage).changeNumber("20");
  console.log("Number Updating....");
  await numberChange.wait();
  number = await (await SimpleStorage).readNumber();
  console.log(`Updated Number: ${number}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying Contract.....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.error(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
