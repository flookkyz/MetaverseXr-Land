import Web3 from 'web3';
import { marketAddr, marketABI, nftAddr, nftABI, givenProvider } from './Contract';
import axios from "axios";

export const sell = async (tokenId, price) => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    const accounts = await new web3.eth.getAccounts();

    window.contract = new web3.eth.Contract(nftABI, nftAddr);

    const uri = await window.contract.methods.uri(tokenId).call();

    return await window.contract.methods.setApprovalForAll(marketAddr, true).send({ from: accounts[0] }).on('transactionHash', function (hash) {
        web3.eth.getTransaction(hash, async function (error, result) {
            console.log(result);
            window.contract = new web3.eth.Contract(marketABI, marketAddr);
            await window.contract.methods.addListing(price, nftAddr, tokenId).send({ from: accounts[0] }).on('transactionHash', function (hash) {
                web3.eth.getTransaction(hash, function (error, result) {
                    console.log(result);
                    var data = JSON.stringify({
                        query: `mutation updateNFT ($tokenId: ID!, $owner: String, $uri: String, $price: String, $isListing: Boolean) {
                          updateNFT (tokenId: $tokenId, owner: $owner, uri: $uri, price: $price, isListing: $isListing) {
                                tokenId
                                owner
                                isListing
                          }
                    }`,
                        variables: { tokenId: Number(tokenId).toString(), owner: accounts[0].toLowerCase(), uri: uri, price: price, isListing: true }
                    });

                    var config = {
                        method: 'post',
                        url: 'https://test-landgraphql.herokuapp.com/graphql',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
            });
        });
    });
}