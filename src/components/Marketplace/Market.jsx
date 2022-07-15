import React, { useEffect, useState } from "react";
import { BsArrowRightShort, BsDiamond } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import { givenProvider } from "../web3/Contract";
// ---------------------------- pic ----------------------------//
import Land from "../../assets/NFTPic/land.png";

function Market() {

  const [market, SetMarket] = useState([]); 
  const web3 = new Web3(Web3.givenProvider || givenProvider);

  useEffect(() => {
    NFTs();
  }, []);

  function handleChange(event) {
    if(event.target.value.length > 0) {
      FindNFTs(event.target.value);
    }
    else {
      NFTs();
    }
  }
  
  const NFTs = async () => {
    var data = JSON.stringify({
      query: `query nfts {
        nfts {
          tokenId
          owner
          uri
          price
          isListing
        }
    }`,
      variables: {}
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
      console.log(response.data.data.nfts);
      SetMarket(response.data.data.nfts);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const FindNFTs = async (tokenId) => {
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
      variables: { tokenId: tokenId }
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
      SetMarket(response.data.data.findNFT);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
      {/* ---------------------------------------- topbar ----------------------------------------*/}
      <div className="flex justify-between  items-center px-5">
        <form>
          <div className="flex items-center">
            <input
              type="search"
              id="default-search"
              className="block w-[330px] p-4 pl-2 w-full text-sm text-gray-900 bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Search"
              required
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="text-base text-[#DA46FF] flex flex-row items-center hover:underline">
          Newest <MdOutlineKeyboardArrowDown className="ml-1" />
        </div>
      </div> 
      {/* ---------------------------------------- item ---------------------------------------- */}
      <div className=" flex justify-center ">
        <div className="justify-items-center py-10 grid grid-cols-3 gap-5 ">
          {market.map((nft, index) => (
            <div key={index} className="mb-[35px]">
              <div className="rounded-t-lg w-[280px] h-[250px] bg-gray-700 flex justify-center items-center">
                <img className="w-40 h-40 " src={JSON.parse(Buffer.from(nft.uri.split(',')[1], 'base64').toString()).image} alt="" />
              </div>
              <div className="rounded-b-lg w-[280px] h-[140px] bg-[#1F2937]  py-[10px]">
                <h5 className="text-lg  tracking-tight text-gray-900 dark:text-white mx-[17px]">
                  {`Land #${nft.tokenId}`}
                {nft.isListing && (
                  <span
                  className={`text-base text-center text-white bg-green-600 rounded-lg p-2 w-[150px] ml-12`}>
                  Available
                </span>
                )}
                </h5>
                <span className="mx-[17px] text-gray-400 text-sm">Price</span>
                <br />
                <div className="flex justify-between ml-[17px] mr-[5px] text-white font-semibold text-base">
                  <span>{web3.utils.fromWei(nft.price)} KUB</span>
                  <Link to={`/marketplace/detail/${nft.tokenId}`}>
                    <div className="flex flex-row hover:underline">
                      See details
                      <BsArrowRightShort className="-mt-[1px] mr-[3px] w-[30px] h-[30px]" />
                    </div>
                  </Link>
                </div>
                <div className="border-dashed border border-gray-500 my-1 mx-[8px]"></div>
                <div className="border border-gray-500 rounded-lg w-[130px] flex justify-center items-center text-gray-500 mt-2 mx-[17px] text-sm">
                  <BsDiamond className="mr-1" />
                  Area : Z0{nft.tokenId.substring(0, 3)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Market;
