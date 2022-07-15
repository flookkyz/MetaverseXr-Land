import Web3 from 'web3';
import { givenProvider } from './Contract';

export const getKUB = async () => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    const accounts = await new web3.eth.getAccounts();
    const balance = web3.utils.fromWei(await new web3.eth.getBalance(accounts[0]), "ether");
    return balance;
}