const hre = require("hardhat");

async function main() {
  const ConsentNFT = await hre.ethers.getContractFactory("ConsentNFT");
  const consentNFT = await ConsentNFT.deploy();

  await consentNFT.deployed();
  console.log("Contract deployed to:", consentNFT.address); // THIS IS YOUR CONTRACT ADDRESS
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});