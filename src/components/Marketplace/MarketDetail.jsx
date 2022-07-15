import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import PicLand from "../../assets/NFTPic/land.png";
import PicUser from "../../assets/images/test/user.png";
import Web3 from "web3";
import axios from "axios";
import { givenProvider } from "../web3/Contract";
import { purchase } from "../web3/Purchase";

function MarketDetail() {

  const [log, SetLog] = useState([]);
  const [tokenId, SetTokenId] = useState("");
  const [image, SetImage] = useState("");
  const [price, SetPrice] = useState("");
  const [owner, SetOwner] = useState("");
  const [isListing, SetIsListing] = useState(false);
  const [isOwner, SetIsOwner] = useState(false);
  const web3 = new Web3(Web3.givenProvider || givenProvider);

  useEffect(() => {
    NFTs();
    LOGs();
  }, []);

  const NFTs = async () => {
    const account = await window.ethereum.request({ method: "eth_requestAccounts" });
    var data = JSON.stringify({
      query: `query findNFT ($tokenId: ID!) {
        findNFT (tokenId: $tokenId) {
          tokenId
          owner
          uri
          price
          isListing
        }
    }`,
      variables: { tokenId: window.location.pathname.split('detail/')[1] }
    });
    
    var config = {
      method: 'post',
      url: 'https://test-landgraphql.herokuapp.com/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    await axios(config)
    .then(function (response) {
      console.log(response.data.data.findNFT);
      SetTokenId(response.data.data.findNFT.tokenId)
      SetImage(JSON.parse(Buffer.from(response.data.data.findNFT.uri.split(',')[1], 'base64').toString()).image);
      SetPrice(web3.utils.fromWei(response.data.data.findNFT.price));
      SetOwner(response.data.data.findNFT.owner);
      SetIsListing(response.data.data.findNFT.isListing);
      if(response.data.data.findNFT.owner.toLowerCase() === account[0].toLowerCase()) {
        SetIsOwner(true);
      }
      else {
        SetIsOwner(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const LOGs = async () => {
    var data = JSON.stringify({
      query: `query findLOG ($tokenId: ID!) {
        findLOG (tokenId: $tokenId) {
          tokenId
          from
          to
          price
          timestamp
        }
    }`,
      variables: { tokenId: window.location.pathname.split('detail/')[1] }
    });
    
    var config = {
      method: 'post',
      url: 'https://test-landgraphql.herokuapp.com/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    await axios(config)
    .then(function (response) {
      console.log(response.data.data.findLOG.sort(function(a, b){return b.timestamp - a.timestamp}));
      SetLog(response.data.data.findLOG.sort(function(a, b){return b.timestamp - a.timestamp}));
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const BuyWithOutRef = async () => {
    await purchase(window.location.pathname.split('detail/')[1], "0x0000000000000000000000000000000000000000");
  };

  return (
    <div className="py-[70px] px-[300px] h-full">
      <div className="text-white text-lg font-semibold mb-[40px] ml-[100px] hover:underline">
        <Link
          to="/marketplace"
          className="w-[100px] flex flex-row items-center"
        >
          <IoIosArrowBack className="mr-[5px] w-[20px] h-[20px]" />
          Back
        </Link>
      </div>

      <div className="flex flex-col flex justify-center 2xl:flex-row">
        <div className="w-[440px] h-[440px] bg-gray-700 rounded-lg mr-[50px] flex items-center justify-center">
          <img src={image} alt="PicLand" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <span className="text-3xl text-white mb-2 mr-2">World</span>
            <button className="text-white bg-[#490CFA] px-2 rounded-lg w-[100px] h-[30px] flex flex-row items-center justify-center -mt-[6px]">
              Jump in
              <FiLogIn className="ml-2" />{" "}
            </button>
          </div>
          <div className="text-white mt-2 flex flex-row items-center">
            <span className="text-base text-white bg-gray-800 rounded-lg px-3 py-1 mr-[15px]">
              Land #{tokenId}
            </span>{" "}
            <div className="grid grid-cols-2 divide-x divide-gray-500">
              <span className="mr-5 text-center flex flrx-row">
                {" "}
                Creator : <img src={PicUser} alt="user" className="mx-2" />{" "}
                0x476c4774fc5f754a987a06b8204b28d3a6625b6f
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-500">
              <span className="text-center pl-5 flex flrx-row">
                {" "}
                Owner : <img src={PicUser} alt="user" className="mx-2" />{" "}
                {owner}
              </span>
            </div>
          </div>
          <div className="border-dashed border border-gray-500 my-7 mx-[8px]"></div>
          <center>
            <div className="w-[450px] h-[200px] bg-gray-800 rounded-lg py-[25px] px-[40px] flex flex-col text-white">
              <div className="flex flex-row items-center">
                <div className="rounded-full w-5 h-5 bg-green-500 mr-5"></div>
                <span className="text-xl font-semibold">{price} KUB</span>
              </div>

              <select
                id="coin"
                className="bg-gray-800 my-4 border-2 border-white text-white text-base rounded-lg focus:ring-white-500 focus:border-white block w-full p-2.5 dark:bg-gray-800 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
              >
                <option value="KUB">KUB</option>
                <option value="KUSDT">KUSDT</option>
              </select>
              {isListing && !isOwner && (
              <center>
                <button className="bg-[#490CFA] w-[250px] h-[40px] rounded-lg"
                onClick={BuyWithOutRef}>
                  BUY NOW
                </button>
              </center>
              )}
            </div>
          </center>
          <span className="text-white text-base font-semibold mt-8">
            History
          </span>
          <div className="flex justify-between mt-3 ml-5 mx-[30px]">
            <span className="text-gray-500">Date</span>
            <span className="text-gray-500">From</span>
            <span className="text-gray-500">to</span>
            <span className="text-gray-500 mr-7">Price</span>
          </div>
          <div className=" w-full h-24 overflow-y-auto itemmarket">
            {log.map((log, index) => (
            <div className="w-full h-10 flex justify-between text-white px-5">
              <span>{new Date(log.timestamp * 1000).getDate() + "/" + (new Date(log.timestamp * 1000).getMonth() + 1) + "/" + new Date(log.timestamp * 1000).getFullYear()}</span>
              <span>{log.from}</span>
              <span>{log.to}</span>
              <span>{log.price} KUB</span>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketDetail;
