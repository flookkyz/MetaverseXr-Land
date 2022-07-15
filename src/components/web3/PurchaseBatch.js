import Web3 from 'web3';
import { marketAddr, marketABI, nftAddr, givenProvider } from './Contract';

export const purchaseBatch = async (tokenId, referer) => {
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
        const prevFee = [];
        var price;
        var totalPrice;
        var prevOwnersAmount;
        var refFee;
        var totalRefFee;
        var metaverseFee;
        var totalMetaverseFee;
        var avgMetaverseFee;
        const account = await getCurrentAccount();

        for(let i = 0; i < tokenId.length; i++) {
            price = await getPrice(tokenId[i]);
            totalPrice += Number(price);
            prevOwnersAmount = await PrevOwnerCount(tokenId[i]);
            
            refFee = await RefFeeCalculate(price, referer);
            if(i === 0) {
                totalRefFee = Number(refFee);
            }
            else {
                totalRefFee += Number(refFee);
            }

            metaverseFee = await MetaverseFeeCalculate(price, prevOwnersAmount);
            if(i === 0) {
                totalMetaverseFee = Number(metaverseFee);
            }
            else {
                totalMetaverseFee += Number(metaverseFee);
            }
            prevFee[i] = (await PreviousFeeCalculate(price, refFee, prevOwnersAmount)).toString();
        };

        avgMetaverseFee = (totalMetaverseFee / tokenId.length);
    
        return await window.contract.methods.purchaseBatch(nftAddr, tokenId, referer, avgMetaverseFee.toString(), prevFee, totalRefFee.toString()).send({ from: account, value: totalPrice.toString() }).on('transactionHash', function (hash) {
            web3.eth.getTransaction(hash, function (error, result) {
                console.log(result);
            });
        });
    }

    purchase(tokenId, referer);
}