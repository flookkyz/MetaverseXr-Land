import React, { useEffect, useState } from "react";
import TopbarLayer3 from "../TopbarLayer3";
import Bbar from "../../MapLayer2/B-bar";
import { useParams } from "react-router-dom";
import PicLand from "../../../assets/NFTPic/land.png";
import LoadingPic from "../../../assets/Loading/Map-ui-2.gif";
import { FiLogIn } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import Web3 from "web3";
import { givenProvider } from "../../web3/Contract";
import { purchase } from "../../web3/Purchase";
import {
  getIsListing,
  getOwner,
  getPrice,
  getSeller,
} from "../../web3/Listing";
import { getImage, getName, getDescription } from "../../web3/Metadata";
import { getMyLand } from "../../web3/MyLand";
import { sell } from "../../web3/Sell";
import { sellApprove } from "../../web3/SellApprove";
import { ownerOf, isOwnerOf } from "../../web3/OwnerOf";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { approveKusdt } from "../../web3/ApproveKUSDT";
import { purchaseKusdt } from "../../web3/PurchaseKUSDT";
import { data } from "autoprefixer";
import axios from "axios";
// import { useQuery, gql } from "@apollo/client";

function Layer3() {
  const web3 = new Web3(Web3.givenProvider || givenProvider);
  let { idl1, idl2, numland, numcols } = useParams(); // idl1 , idl2 ค่าเลขแต่ละโซน
  const [ID, setID] = useState("0000"); // ค่า ID แต่ละ land
  const IDSentnft = idl1 + idl2 + ID; // ส่งให้พี่นอร์ท
  const IDSentverse = `L_${idl1}_${idl2}_${ID}`; // ส่งให้พี่เจมส์
  const [DivClass, setDivClass] = useState(
    "grid grid-cols-[repeat(77,_minmax(0,_1fr))] mt-[30px] px-[300px]" // ค่าจำนวนแถวของ land
  );

  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);
  const [isShow, setIsShow] = useState(true); //disable btn

  const [price, setPrice] = useState(0); // ราคาของ land
  const [imgLand, setImgLand] = useState(`${PicLand}`); // รูปของ land
  const [listStatus, setListStatus] = useState("Unavailable"); // land วางขายอยู่รึป่าว
  const [isOwner, setIsOwner] = useState(false); // เป็นเจ้าของรึป่าว

  const [listStatusBg, setListStatusBg] = useState("red"); // bg สถานะการขาย
  const [openBuyApprove, setOpenBuyApprove] = useState(false); // เปิดปุ่ม approve ซื้อ
  const [openBuy, setOpenBuy] = useState(false); // เปิดปุ่มซื้อ
  const [openSellApprove, setOpenSellApprove] = useState(false); // เปิดปุ่ม approve ขาย
  const [openSell, setOpenSell] = useState(false); // เปิดปุ่มขาย
  const [bgLand, setBgLand] = useState([]); // สีปุ่ม land
  const [updateBgLand, SetUpdateBgLand] = useState(false); // เปลี่ยนสีปุ่ม
  const [clickBuy, SetClickBuy] = useState(false);

  //---------------------------------------------------------- Slide bar -------------------------------------------------------------------//
  const [isOpenSlide, setIsOpenSlide] = useState(false);
  const { save } = useNewMoralisObject("_User");
  const { Moralis } = useMoralis();
  const [isSave, setIsSave] = useState(false);
  const [sellPrice, setSellPrice] = useState("0"); // value of price land

  // ----------------------------------------------------------- input sellprice ----------------------------------------------------------- //
  const handleInputPrice = (e) => {
    const { id, value } = e.target;
    if (id === "Sellprice") {
      setSellPrice(value);
    }
  };

  // ----------------------------------------------------------- click to select land ----------------------------------------------------------- //
  const ListtoSelect = [];
  const [selectList, setSelectList] = useState(ListtoSelect);

  // const addtoList = (landLayer3) => {
  //   const newList = selectList.concat({landLayer3});
  //   setSelectList(newList);
  //   console.log("list", selectList.length)
  // }

  // const clearselect = (index) => {
  //   setSelectList((items) => items.filter((_, i) => i !== index));
  // }
  // ----------------------------------------------------------- genarate land ----------------------------------------------------------- //
  const myLand = "[#490CFA]";
  const myList = "blue-500";
  const hasBought = "yellow-600";
  const fromMXR = "purple-800";
  const landsSale = "green-600";
  const premium = "[#DA46FF]";
  const outsideZone = "red-800";
  const test = [];
  const allId = [];
  for (let i = 1; i <= numland; i++) {
    test.push([i]);
    if (i < 10) {
      allId.push(idl1 + idl2 + `000${i}`);
    } else if (i < 100 && i > 9) {
      allId.push(idl1 + idl2 + `00${i}`);
    } else if (i < 1000 && i > 99) {
      allId.push(idl1 + idl2 + `0${i}`);
    } else {
      allId.push(idl1 + idl2 + `${i}`);
    }
  }

  // for (let i = 99; i < allId.length; i++) {
  //   bgLand[i] = "red-800";
  // }
  // ----------------------------------------------------------- set ID land ----------------------------------------------------------- //
  const SaveID = (landLayer3) => {
    var IDTEST = `${landLayer3[0]}`;
    // console.log("e", IDTEST.length);

    if (IDTEST.length === 1) {
      setID(`000${IDTEST}`);
    } else if (IDTEST.length === 2) {
      setID(`00${IDTEST}`);
    } else if (IDTEST.length === 3) {
      setID(`0${IDTEST}`);
    } else {
      setID(`${IDTEST}`);
    }
    console.log("Land ID = ", ID);
  };
  // ----------------------------------------------------------- set unit land ----------------------------------------------------------- //
  useEffect(() => {
    setTimeout(() => {
      // setloading(true);
      if (numcols === "45") {
        setDivClass(
          "grid grid-cols-[repeat(45,_minmax(0,_1fr))] mt-[30px] px-[500px]"
        );
      } else if (numcols === "46") {
        setDivClass(
          "grid grid-cols-[repeat(46,_minmax(0,_1fr))] mt-[30px] px-[500px]"
        );
      } else if (numcols === "50") {
        setDivClass(
          "grid grid-cols-[repeat(50,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      } else if (numcols === "52") {
        setDivClass(
          "grid grid-cols-[repeat(52,_minmax(0,_1fr))] mt-[30px] px-[400px]"
        );
      } else if (numcols === "55") {
        setDivClass(
          "grid grid-cols-[repeat(55,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      } else if (numcols === "56") {
        setDivClass(
          "grid grid-cols-[repeat(56,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      } else if (numcols === "57") {
        setDivClass(
          "grid grid-cols-[repeat(57,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      } else if (numcols === "59") {
        setDivClass(
          "grid grid-cols-[repeat(59,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      } else if (numcols === "60") {
        setDivClass(
          "grid grid-cols-[repeat(60,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      } else if (numcols === "77") {
        setDivClass(
          "grid grid-cols-[repeat(77,_minmax(0,_1fr))] mt-[30px] px-[300px]"
        );
      }
    }, 3000);

    // setTimeout(() => {
    //   setcompleted(true);
    // }, 3000);
  }, [numcols]);

  useEffect(() => {
    LandPrice().then((price) => setPrice(price));
    getIsListing(IDSentnft).then((isListing) => {
      if (isListing) {
        setListStatus("Available");
        setListStatusBg("green-600");
        setOpenBuy(false);
        setOpenSell(false);
        if (isOwner) {
          setOpenSell(true);
        } else {
          setOpenBuy(true);
        }
      } else {
        setListStatus("Unavailable");
        setListStatusBg("red-800");
        setOpenBuy(false);
        setOpenSell(false);
        if (isOwner) {
          setOpenSell(true);
        }
      }
    });
    isOwnerOf(IDSentnft).then((isOwner) => {
      setIsOwner(isOwner);
    });
  });

  useEffect(() => {
    runSubGraph().then((color) => {
      console.log(color);
      setBgLand(color);
      setloading(true);
      setcompleted(true);
    });
  }, [updateBgLand, listStatus]);

  useEffect(() => {
    getImage(IDSentnft).then((image) => {
      if (image === "SyntaxError: Unexpected token < in JSON at position 0") {
        setImgLand(PicLand);
      }
      else {
        setImgLand(image);
      }
    });
  }, [IDSentnft]);

  const runSubGraph = async () => {
    // const subGraph = await axios.post('https://api.studio.thegraph.com/query/29392/ocnsubgraph/v0.0.1', {
    //     query: `
    //     {
    //       tokens(first: 5) {
    //         id
    //         tokenId
    //         contentURI
    //         metadataURI
    //       }
    //       users(first: 5) {
    //         id
    //         tokens {
    //           id
    //         }
    //         created {
    //           id
    //         }
    //       }
    //     }
    //     ` 
    //   });

    //   console.log(subGraph.data.data.users[0].tokens.length);
    // "https://test-landgraphql.herokuapp.com/graphql"

    var data = JSON.stringify({
      query: `query nfts {
        nfts {
            owner
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

    const color = [];
    
    await axios(config)
    .then(async function (response) {
      console.log(JSON.stringify(response.data.data.nfts));
      const account = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      for (let i = 0; i < response.data.data.nfts.length; i++) {
        var _owner = response.data.data.nfts[i].owner;
        var _isListing = response.data.data.nfts[i].isListing;
        if (_owner === account[0] && !_isListing) {
          color.push(myLand);
        }
        else if (_owner === account[0] && _isListing) {
          color.push(myList);
        }
        else if (_owner !== account[0] && _isListing && _owner !== "0x476c4774fc5f754a987a06b8204b28d3a6625b6f") {
          color.push(landsSale);
        }
        else if (_owner !== account[0] && _isListing && _owner === "0x476c4774fc5f754a987a06b8204b28d3a6625b6f") {
          color.push(fromMXR);
        }
        else if (_owner !== account[0] && !_isListing) {
          color.push(hasBought);
        }
        else {
          color[i] = outsideZone;
        }
      };
    })
    .catch(function (error) {
      console.log(error);
    });

    return color;
  }

  const sendOwnerLandID = async () => {
    const Land = Moralis.Object.extend("_User");
    const query = new Moralis.Query(Land);
    const myDetails = await query.first();
    myDetails.set("landposition", IDSentverse);
    myDetails.save();
  };

  // console.log(`ID = ${idl1}${idl2}${IDLayer3}`);
  // console.log(`ID = L_${idl1}_${idl2}_${IDLayer3}`);
  // console.log(ID);
  const BuyWithOutRef = async () => {
    await purchase(IDSentnft, "0x0000000000000000000000000000000000000000");
    // await updateLandDetail();
    SetUpdateBgLand(!updateBgLand);
  };

  const ApproveKusdt = async () => {
    await approveKusdt(web3.utils.toWei(price, "ether"));
  };

  const BuyKusdt = async () => {
    await purchaseKusdt(IDSentnft, "0x0000000000000000000000000000000000000000");
  };

  const LandPrice = async () => {
    return web3.utils.fromWei(await getPrice(IDSentnft), "ether");
  };

  const Sell = async () => {
    await sell(IDSentnft, web3.utils.toWei(sellPrice, "ether"));
    // await updateLandDetail();
    SetUpdateBgLand(!updateBgLand);
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="flex justify-between">
        <div className="flex flex-col absolute w-full ">
          <h1 className={` text-white text-3xl font-bold text-center mt-5 `}>
            Zone {idl1}
            {idl2} <br />
          </h1>
          <TopbarLayer3 />
          {!completed ? (
            <center>
              {!loading ? (
                <>
                  <div className="h-[400px]">
                    <img src={LoadingPic} className="w-[250px] mt-[150px]" />
                    <span className="animate-pulse text-white text-3xl font-semibold">
                      Loading...
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </center>
          ) : (
            <>
              <div className={DivClass}>
                {test.map((landLayer3, index) => (
                  <div
                    onClick={async () => {
                      setIsOpenSlide(true);
                      SaveID(landLayer3);
                      // addtoList(landLayer3);
                    }}
                    key={index}
                    id={landLayer3}
                    className={`w-[15px] h-[15px] bg-${bgLand[index]} mt-1 hover:bg-white`}
                  ></div>
                ))}
              </div>
            </>
          )}
          <Bbar />
        </div>
        {/* // ----------------------------------------------------------- sidebar ----------------------------------------------------------- // */}
        {isOpenSlide === true && (
          <>
            <div className="bg-[#111827] w-[290px] h-screen z-10 right-0 fixed flex justify-center">
              <div className="flex flex-col">
                <div className="flex justify-start -mx-[30px]">
                  <button

                    onClick={() => {
                      setIsOpenSlide(false);
                    }}
                  >
                    <IoIosClose className="fill-white w-[50px] h-[50px] exit " />
                  </button>
                </div>
                <div className="bg-[#374151] w-[240px] h-[300px] z-20 mt-[40px] flex justify-center rounded-t-lg">
                  <div className="bg-[#4B5563] w-[200px] h-[250px] mt-[20px] rounded-lg flex items-center justify-center">
                    <img src={imgLand} alt="land" className="w-[160px]" />
                  </div>
                </div>
                <div className="bg-[#1F2937] w-[240px] h-[50px] rounded-b-lg  flex items-center justify-center">
                  <span className="text-white text-2xl">{price} KUB</span>
                </div>
                <div className="flex flex-row items-center ">
                  <span className="text-white text-3xl mt-[20px]">
                    Ice Land
                  </span>
                  {openSell && (
                    <a
                      href="https://8628-2403-6200-89a7-ca0a-fce0-5a3-996-8e59.ap.ngrok.io/"
                      target="_blank"
                    >
                      <button
                        className="text-white text-[14px] bg-[#490CFA] px-2 rounded-lg w-[90px] h-[25px] flex flex-row items-center justify-center mt-[20px] ml-2"
                        onClick={sendOwnerLandID}
                      >
                        Jump in
                        <FiLogIn className="ml-2" />{" "}
                      </button>
                    </a>
                  )}
                </div>
                <div className="flex flex-row">
                  <span className="text-xs text-center text-white bg-gray-800 rounded-lg py-1 w-[120px] mt-[20px]">
                    Land # {IDSentnft}
                  </span>
                  <span className="text-xs text-center text-white bg-gray-800 rounded-lg py-1 w-[60px] ml-2 mt-[20px]">
                    {selectList.length} block
                  </span>
                  {/* <button onClick={clearselect(index)}>clear block</button> */}
                </div>
                <span
                  className={`text-base text-center text-white bg-${listStatusBg} rounded-lg py-1 w-[150px] mt-[20px]`}
                >
                  {listStatus}
                </span>
                <select
                  id="selectcoin"
                  onChange={(e) => {
                    if (e.target.value === "KUSDT") setIsShow(false);
                    else setIsShow(true);
                    console.log(isShow);
                  }}
                  className="bg-gray-800 my-[20px] border-2 border-white text-white text-xs rounded-lg focus:ring-white-500 focus:border-white block w-full h-[30px] pl-2 dark:bg-gray-800 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
                >
                  <option value="KUB">KUB</option>
                  <option value="KUSDT">KUSDT</option>
                </select>
                {!isShow && openBuy && (
                  <button className="bg-[#490CFA] w-[240px] h-[40px] rounded-lg text-white font-semibold mb-2"
                    onClick={ApproveKusdt}>
                    APPROVE TOKEN
                  </button>
                )}
                {!isShow && openBuy && (
                  <button className="bg-[#490CFA] w-[240px] h-[40px] rounded-lg text-white font-semibold mb-2"
                    onClick={BuyKusdt}>
                    BUY
                  </button>
                )}
                {isShow && openBuy && (
                  <button
                    className="bg-[#490CFA] w-[240px] h-[40px] rounded-lg text-white font-semibold"
                    onClick={BuyWithOutRef}
                  >
                    BUY
                  </button>
                )}
                {openSellApprove && (
                  <button
                    className="bg-[#490CFA] w-[240px] h-[40px] rounded-lg text-white font-semibold mt-2"
                    onClick={sellApprove}
                  >
                    APPROVE SELL
                  </button>
                )}
                {openSell && (
                  <>
                    <input
                      placeholder="price"
                      type="text"
                      id="Sellprice"
                      value={sellPrice}
                      onChange={(e) => handleInputPrice(e)}
                      className="bg-gray-800 border-2 border-white text-white text-xs rounded-lg focus:ring-white-500 focus:border-white block w-full h-[30px] pl-2 dark:bg-gray-800 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
                    />
                    <button
                      className="bg-[#490CFA] w-[240px] h-[40px] rounded-lg text-white font-semibold mt-2"
                      onClick={() => {
                        Sell();
                      }}
                    >
                      SELL
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Layer3;