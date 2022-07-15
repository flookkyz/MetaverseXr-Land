import Web3 from 'web3';
import { nftAddr, nftABI, givenProvider } from './Contract';

export const ownerOf = async (tokenId) => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);

    window.contract = new web3.eth.Contract(nftABI, nftAddr);

    return await window.contract.methods.ownerOf(tokenId).call();
}

export const isOwnerOf = async (tokenId) => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);

    window.contract = new web3.eth.Contract(nftABI, nftAddr);

    const accounts = await new web3.eth.getAccounts();
    const owner = await ownerOf(tokenId);
    var isOwner;

    if(owner === accounts[0]) {
        isOwner = true;
        return isOwner;
    }
    else {
        isOwner = false;
        return isOwner;
    }
}