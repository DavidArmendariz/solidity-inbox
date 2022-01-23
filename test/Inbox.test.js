import ganache from 'ganache';
import Web3 from 'web3';
import Inbox from '../inbox';

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(Inbox.interface))
    .deploy({
      data: Inbox.bytecode,
      arguments: ['Hello World!'],
    })
    .send({ from: accounts[0], gas: 1000000 });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});
