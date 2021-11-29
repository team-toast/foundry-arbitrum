const aFry = artifacts.require("aFRY");

contract("aFry", () => {
  it("Initial supply should be zero", async () => {
    const aFryContract = await aFry.new();
    const supply = await aFryContract.totalSupply();
    assert(supply.toString() === "0");
  });
});
