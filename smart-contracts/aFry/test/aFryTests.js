const aFryABI = artifacts.require("aFRY");
const fryABI = artifacts.require("FRY");
const converterABI = artifacts.require("Converter");

contract("aFry", (accounts) => {
  it("Initial supply should be zero", async () => {
    const aFryContract = await aFryABI.new();
    const supply = await aFryContract.totalSupply();
    assert(supply.toString() === "0");
  });

  it("Owner should be able to mint", async () => {
    const aFryContract = await aFryABI.new();
    await aFryContract.mint(accounts[0], "100");
    const supply = await aFryContract.totalSupply();
    //console.log("Total Supply: ", supply);
    assert(supply.toString() === "100");
  });

  //   it("Non owner should not able to mint", async () => {
  //     const aFryContract = await aFry.new();
  //     await aFryContract.mint(accounts[0], "100", { from: accounts[1] });
  //     const supply = await aFryContract.totalSupply();
  //     //console.log("Total Supply: ", supply);
  //     assert(supply.toString() === "0");
  //   });

  it("Should be able to burn", async () => {
    const aFryContract = await aFryABI.new();
    await aFryContract.mint(accounts[0], "100");
    await aFryContract.burn("50");
    const supply = await aFryContract.totalSupply();
    //console.log("Total Supply: ", supply);
    //console.log("CONTRACT METHODS: ", aFryContract.methods);
    assert(supply.toString() === "50");
  });

  it("Should be able to wrap FRY into aFRY", async () => {
    const aFryContract = await aFryABI.new();
    const fryContract = await fryABI.new();
    const converterContract = await converterABI.new(fryContract.address, aFryContract.address); 
    await fryContract.mint(accounts[0], "100");

    // Set Allowance for FRY
    await fryContract.approve(converterContract.address, "1000");

    // Give Converter Minter role for aFry
    await aFryContract.addMinter(converterContract.address);

    await converterContract.wrap("10");
    
    
    const fryBalance = await fryContract.balanceOf(accounts[0]);
    const aFryBalance = await aFryContract.balanceOf(accounts[0]);
    console.log("FRY BALANCE: ", fryBalance.toString())
    console.log("aFRY BALANCE: ", aFryBalance.toString())

    const aFrySupply = await aFryContract.totalSupply();
    assert(aFrySupply.toString() === "10");
  });

  it("Should be able to unwrap aFRY into FRY", async () => {
    const aFryContract = await aFryABI.new();
    const fryContract = await fryABI.new();
    const converterContract = await converterABI.new(fryContract.address, aFryContract.address); 
    await fryContract.mint(accounts[0], "100");

    // Set Allowance for FRY
    await fryContract.approve(converterContract.address, "1000");

    // Give Converter Minter role for aFry
    await aFryContract.addMinter(converterContract.address);

    await converterContract.wrap("10");
    
    let fryBalance = await fryContract.balanceOf(accounts[0]);
    let aFryBalance = await aFryContract.balanceOf(accounts[0]);
    console.log("FRY BALANCE before unwrap: ", fryBalance.toString())
    console.log("aFRY BALANCE before unwrap: ", aFryBalance.toString())

    // Set Allowance for aFRY
    await aFryContract.approve(converterContract.address, "1000");

    await converterContract.unwrap("10");
    
    fryBalance = await fryContract.balanceOf(accounts[0]);
    aFryBalance = await aFryContract.balanceOf(accounts[0]);
    console.log("FRY BALANCE after unwrap: ", fryBalance.toString())
    console.log("aFRY BALANCE after unwrap: ", aFryBalance.toString())


    const aFrySupply = await aFryContract.totalSupply();
    assert(aFrySupply.toString() === "0");
  });
});
