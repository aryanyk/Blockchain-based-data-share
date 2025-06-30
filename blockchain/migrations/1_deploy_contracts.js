const ConsentNFT = artifacts.require("ConsentNFT");

module.exports = function(deployer) {
  deployer.deploy(ConsentNFT);
};