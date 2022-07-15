import Web3 from 'web3';
import { marketAddr, marketABI, nftAddr, nftABI, givenProvider } from './Contract';
import axios from "axios";

export const purchase = async (tokenId, referer) => {
    const web3 = new Web3(Web3.givenProvider || givenProvider);
    const nullAddr = "0x0000000000000000000000000000000000000000";

    window.contract = new web3.eth.Contract(marketABI, marketAddr);

    async function getCurrentAccount() {
        const accounts = await new web3.eth.getAccounts();
        return accounts[0];
    }

    async function getPrice(tokenId) {
        const price = await window.contract.methods.getPrice(nftAddr, tokenId).call();
        return price;
    }

    async function getPrevOwner(tokenId) {
        const prevOwners = [];
        for (let i = 0; i < 5; i++) {
            prevOwners[i] = await window.contract.methods.getPrevOwner(nftAddr, tokenId, i).call();
        }
        return prevOwners;
    }

    async function PrevOwnerCount(tokenId) {
        const prevOwners = await getPrevOwner(tokenId);
        var prevOwnersCount = 0;
        for (let i = 0; i < 5; i++) {
            if (prevOwners[i] !== nullAddr) {
                prevOwnersCount++;
            }
            else {
                break;
            }
        }
        return prevOwnersCount;
    }

    async function MetaverseFeeCalculate(price, prevOwnersAmount) {
        if (prevOwnersAmount !== 0) {
            return Math.floor((price * 0.05) / 2);
        }
        else {
            return Math.floor(price * 0.05);
        }
    }

    async function RefFeeCalculate(price, referer) {
        if (referer !== nullAddr) {
            return Math.floor(((price * 0.05) / 2) * 0.05);
        }
        else {
            return 0;
        }
    }

    async function PreviousFeeCalculate(price, refFee, prevOwnersAmount) {
        if (prevOwnersAmount !== 0) {
            return Math.floor((((price * 0.05) / 2) - refFee) / prevOwnersAmount);
        }
        else {
            return 0;
        }
    }

    async function purchase(tokenId, referer) {
        const account = await getCurrentAccount();
        const price = await getPrice(tokenId);
        const prevOwnersAmount = await PrevOwnerCount(tokenId);
        const metaverseFee = await MetaverseFeeCalculate(price, prevOwnersAmount);
        const refFee = await RefFeeCalculate(price, referer);
        const prevFee = await PreviousFeeCalculate(price, refFee, prevOwnersAmount);
        var from;
        var to;
        var timestamp;

        await window.contract.methods.purchase(nftAddr, tokenId, referer, metaverseFee.toString(), prevFee.toString(), refFee.toString()).send({ from: account, value: price.toString() }).on('receipt', async function (receipt) {
            window.contract = new web3.eth.Contract(nftABI, nftAddr);
            const uri = await window.contract.methods.uri(tokenId).call();
            window.contract.getPastEvents('Transfer', {
                fromBlock: receipt.blockNumber,
                toBlock: receipt.blockNumber
            }, function (error, events) { console.log(events); })
                .then(async function (events) {
                    var nftLogs = events;

                    let text = JSON.stringify(nftLogs[0].returnValues);
                    let obj = JSON.parse(text)

                    from = obj.from;
                    to = obj.to;
                    timestamp = (await web3.eth.getBlock(receipt.blockNumber)).timestamp

                    var data = JSON.stringify({
                        query: `mutation updateNFT ($tokenId: ID!, $owner: String, $uri: String, $price: String, $isListing: Boolean) {
                      updateNFT (tokenId: $tokenId, owner: $owner, uri: $uri, price: $price, isListing: $isListing) {
                            tokenId
                            owner
                            isListing
                      }
                  }
                `,
                        variables: { tokenId: Number(tokenId).toString(), owner: account.toLowerCase(), uri: uri, price: price.toString(), isListing: false }
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
                            var data = JSON.stringify({
                                query: `
                          mutation addLOG ($blockNumber: Int!, $transactionHash: String!, $tokenId: ID!, $from: String!, $to: String!, $price: String!, $timestamp: Int!) {
                            addLOG (blockNumber: $blockNumber, transactionHash: $transactionHash, tokenId: $tokenId, from: $from, to: $to, price: $price, timestamp: $timestamp) {
                                blockNumber  
                                transactionHash
                                tokenId
                                from
                                to
                                price
                                timestamp
                            }
                        }
                        `,
                                variables: { blockNumber: receipt.blockNumber, transactionHash: receipt.transactionHash, tokenId: Number(tokenId).toString(), from: from, to: to, price: price.toString(), timestamp: timestamp }
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
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
        });
    }

    return await purchase(tokenId, referer);
}