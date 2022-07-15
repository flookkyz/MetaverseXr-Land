import Web3 from 'web3';
import { nftAddr, nftABI, givenProvider } from './Contract';

const getURI = async (tokenId) => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);

    window.contract = new web3.eth.Contract(nftABI, nftAddr);

    return await window.contract.methods.uri(tokenId).call();
}

export const getImage = async (tokenId) => {
    let url = await getURI(tokenId);
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch (e) {
        return e;
    }

    return obj.image;
};

export const getName = async (tokenId) => {
    let url = await getURI(tokenId);
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch (e) {
        return e;
    }

    return obj.name;
};

export const getDescription = async (tokenId) => {
    let url = await getURI(tokenId);
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch (e) {
        return e;
    }

    return obj.description;
};