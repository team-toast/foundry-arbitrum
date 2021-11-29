const aFry = artifacts.require("aFRY");

contract("aFry", (accounts) => {
  it("Initial supply should be zero", async () => {
    const aFryContract = await aFry.new();
    const supply = await aFryContract.totalSupply();
    assert(supply.toString() === "0");
  });

  it("Should be able to mint", async () => {
    const aFryContract = await aFry.new();
    await aFryContract.mint(accounts[0], "100");
    const supply = await aFryContract.totalSupply();
    //console.log("Total Supply: ", supply);
    assert(supply.toString() === "100");
  });

  it("Should be able to burn", async () => {
    const aFryContract = await aFry.new();
    await aFryContract.mint(accounts[0], "100");
    await aFryContract.burn(accounts[0], "50");
    const supply = await aFryContract.totalSupply();
    //console.log("Total Supply: ", supply);
    assert(supply.toString() === "50");
  });
});
