import Web3 from 'web3';
import { nftAddr, nftABI, givenProvider } from './Contract';

export const getMyLand = async () => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    const accounts = await new web3.eth.getAccounts();

    window.contract = new web3.eth.Contract(nftABI, nftAddr);

    const landAmount = await window.contract.methods.balanceOf(accounts[0]).call();

    const myLand = [];

    for(let i = 0; i < landAmount; i++) {
        myLand.push(await window.contract.methods.tokenOfOwnerByIndex(accounts[0], i).call());
    }

    return myLand;
}