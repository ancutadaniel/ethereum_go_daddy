// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = 'ETH Daddy';
  const SYMBOL = 'ETHD';

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Deploy contract
  const ETHDaddy = await ethers.getContractFactory('ETHDaddy');
  const ethDaddy = await ETHDaddy.deploy(NAME, SYMBOL);
  await ethDaddy.deployed();

  console.log(`Deployed Domain Contract at: ${ethDaddy.address}\n`);

  // List 6 domains
  const names = [
    'dacether.eth',
    'daniel.eth',
    'ancuta.eth',
    'miami.eth',
    'oxygen.eth',
    'carbon.eth',
  ];
  const costs = [
    tokens(5),
    tokens(0.01),
    tokens(0.01),
    tokens(0.02),
    tokens(0.03),
    tokens(0.01),
  ];

  for (let i = 0; i < 6; i++) {
    const transaction = await ethDaddy
      .connect(deployer)
      .list(names[i], costs[i]);
    await transaction.wait();

    console.log(`Listed Domain ${i + 1}: ${names[i]}  🎉🎉`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
