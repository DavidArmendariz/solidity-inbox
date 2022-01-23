import 'dotenv/config';
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import Inbox from './inbox';

const provider = new HDWalletProvider(
  process.env.SEED_PHRASE,
  process.env.NETWORK_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(`Deploying from account: ${accounts[0]}`);
    const result = await web3.eth
      .Contract(JSON.parse(Inbox.interface))
      .deploy({ data: Inbox.bytecode, arguments: ['Hello World!'] })
      .send({ gas: 1000000, from: accounts[0] });
    console.log(`Contract Address: ${result.options.address}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    provider.engine.stop();
  }
};

deploy();
