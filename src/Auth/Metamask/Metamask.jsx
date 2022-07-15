import React, { useEffect, useState } from "react";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import Coin from "../../assets/images/kub.png";
import { getKUB } from "../../components/web3/BalancesKUB";

const Metamask = () => {
  // set states to hold wallet account details

  const [userAccount, setUserAccount] = useState();
  const [balance, setBalance] = useState("0");
  const { Moralis } = useMoralis();
  //  initialize and check if the ethereum blockchain is defined, the assign
  let eth;

  if (typeof window !== "undefined") {
    eth = window.ethereum;
  }

  eth.on("accountsChanged", async (account) => {
    setUserAccount(account[0]);
    window.location.reload(false);
  });

  const connectWallet = async (metamask = eth) => {
    try {
      // check if metamask is installed
      if (!metamask) {
        return alert("please install metamask to proceed");
      }
      // access the account
      const acc = await metamask.request({ method: "eth_requestAccounts" });

      // save Address
      const User = Moralis.Object.extend("_User");
      const query = new Moralis.Query(User);
      const myDetails = await query.first();
      myDetails.set("metamaskAddress", acc[0]);
      myDetails.save();

      setUserAccount(acc[0]);
      const chainId = await metamask.request({ method: "eth_chainId" });
      if (chainId !== "0x6545") {
        try {
          await metamask.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x6545" }],
          });
        } catch (err) {
          if (err.code === 4902) {
            await metamask.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: "Bitkub Chain - Testnet",
                  chainId: "0x6545",
                  nativeCurrency: {
                    name: "KUB",
                    decimals: 18,
                    symbol: "KUB",
                  },
                  rpcUrls: ["https://rpc-testnet.bitkubchain.io"],
                },
              ],
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object found");
    }
  };

  const isMobile = () => {
    return "ontouchstart" in window || "onmsgesturechange" in window;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkWalletConnect = async (metamask = eth) => {
    try {
      // check if metamask is installed
      if (!metamask) {
        return alert("please install metamask to continue");
      }
      const acc = await metamask.request({ method: "eth_accounts" });
      if (acc.length) {
        setUserAccount(acc[0]);
      }

      if (isMobile()) {
        await connectWallet(eth);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkWalletConnect();
  }, [checkWalletConnect]);

  useEffect(() => {
    getKUB().then((balance) => {
      setBalance(balance);
    });
  });

  if (isMobile()) {
    const dappUrl = "web3-metamask-auth.netlify.app";
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className=" h-[45px] px-4 py-2 text-[#DB46FF] rounded-md btn sm:w-[73px] sm:text-[10px] md:w-[80px] md:text-[11px] lg:w-[165px] lg:text-[16px]">
          <span className="sm:text-[14px] sm:ml-[-6px]  md:ml-[-3px] lg:m-0">
            Connect
          </span>
          <span className="sm:invisible  md:invisible  lg:visible">
            {" "}
            wallet
          </span>
        </button>
      </a>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {!userAccount ? (
        <button
          className="h-[45px] px-4 py-2 text-[#DB46FF] rounded-md btn sm:w-[73px] sm:text-[10px] md:w-[80px] md:text-[11px] lg:w-[180px] lg:text-[16px]"
          onClick={() => connectWallet()}
        >
          <span className="sm:text-[14px] sm:ml-[-6px]  md:ml-[-3px] lg:m-0">
            Connect
          </span>
          <span className="sm:invisible  md:invisible  lg:visible">
            {" "}
            wallet
          </span>
        </button>
      ) : (
        <>
          <span className="w-[19px]">
            <img src={Coin} />
          </span>
          <span>
            <div className="w-[70px] text-white">
              {Number(balance).toFixed(2)}
            </div>
          </span>
          <div className="bg-[#490CFA] text-center h-[45px] py-[10px] text-white rounded-md sm:w-[53px] sm:text-[10px] md:w-[60px] md:text-[11px] lg:w-[118px] lg:text-[16px]">
            {userAccount.substring(0, 5)}...
            {userAccount.substring(userAccount.length - 5)}
          </div>
        </>
      )}
    </div>
  );
};

export default Metamask;
