import Web3 from 'web3';
import { marketAddr, ethAddr, ethABI, givenProvider } from './Contract';

export const approveEth = async (price) => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    const accounts = await new web3.eth.getAccounts();

    window.contract = new web3.eth.Contract(ethABI, ethAddr);

    return await window.contract.methods.approve(marketAddr, price).send({ from: accounts[0] }).on('transactionHash', function (hash) {
        web3.eth.getTransaction(hash, function (error, result) {
            console.log(result);
        });
    });
}