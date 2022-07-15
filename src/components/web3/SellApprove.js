import Web3 from 'web3';
import { marketAddr, nftAddr, nftABI, givenProvider } from './Contract';

export const sellApprove = async () => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    const accounts = await new web3.eth.getAccounts();

    window.contract = new web3.eth.Contract(nftABI, nftAddr);

    return await window.contract.methods.setApprovalForAll(marketAddr, true).send({ from: accounts[0] }).on('transactionHash', function (hash) {
        web3.eth.getTransaction(hash, function (error, result) {
            console.log(result);
        });
    });
}