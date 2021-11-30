const Fry = artifacts.require("FRY");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(Fry);
};
