const aFry = artifacts.require("aFRY");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(aFry);
};
