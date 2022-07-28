const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  const burnRate = ethers.BigNumber.from('0.1');
  const burnToken = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
  const burnLocation = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
  const want = 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
  const poolId = ethers.BigNumber.from('0');
  const chef = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc;
  const vault = 0x976EA74026E726554dB657fA54763abd0C3a0aa9;
  const unirouter = 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955;
  const keeper = 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f;
  const strategist = 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720;
  const beefyRecipient = 0xBcd4042DE499D14e55001CcbB24a551F3b954096;
  const outputToNativeRoute = [0x71bE63f3384f5fb98995898A86B02Fb2426c5788];
  const outputToLp0Route = [0x71bE63f3384f5fb98995898A86B02Fb2426c5788];
  const outputToLp1Route = [0xFABB0ac9d68B0B445fB7357272Ff202C5651694a];
  

  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("FroyoStrategy");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
