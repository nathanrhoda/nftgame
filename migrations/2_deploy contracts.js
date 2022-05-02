const nftGame = artifacts.require("NFTGame");

module.exports = function (deployer) {
  deployer.deploy(nftGame);
};
