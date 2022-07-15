import Web3 from 'web3';
import { marketAddr, marketABI, nftAddr, givenProvider } from './Contract';

const loadContract = () => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    return window.contract = new web3.eth.Contract(marketABI, marketAddr);
}

export const getIsListing = async (tokenId) => {
    loadContract();
    return await window.contract.methods.getIsListing(nftAddr, tokenId).call();
}

export const getOwner = async (tokenId) => {
    loadContract();
    return await window.contract.methods.getOwner(nftAddr, tokenId).call();
}

export const getPrice = async (tokenId) => {
    loadContract();
    return await window.contract.methods.getPrice(nftAddr, tokenId).call();
}

export const getSeller = async (tokenId) => {
    loadContract();
    return await window.contract.methods.getSeller(nftAddr, tokenId).call();
}