import {
    getIsListing
} from "./Listing";
import { ownerOf, isOwnerOf } from "./OwnerOf";
import { useMoralis, useNewMoralisObject } from "react-moralis";
const { Moralis } = useMoralis();

const myLand = "[#490CFA]";
const myList = "blue-500";
const hasBought = "yellow-600";
const fromMXR = "purple-800";
const landsSale = "green-600";

const allId = [];
export const ids = () => {
    for (let i = 1; i <= numland; i++) {
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
}

export const setMor = () => {
    for (let i = 0; i < allId.length; i++) {
        const Z0406 = Moralis.Object.extend("Z0406");
        const colorMoralis = new Z0406();
        console.log(allId[i]); 
        var _owner = await ownerOf(allId[i]);
        var _isOwner = await isOwnerOf(allId[i]);
        var _isListing = await getIsListing(allId[i]);
        if (_isOwner && !_isListing) {
            colorMoralis.set("landId", allId[i]);
            colorMoralis.set("color", myLand);
        } else if (_isOwner && _isListing) {
            colorMoralis.set("landId", allId[i]);
            colorMoralis.set("color", myList);
        } else if (!_isOwner && _isListing && _owner != "0x476C4774FC5f754A987A06b8204b28d3A6625b6f") {
            colorMoralis.set("landId", allId[i]);
            colorMoralis.set("color", landsSale);
        } else if (!_isOwner && _isListing && _owner == "0x476C4774FC5f754A987A06b8204b28d3A6625b6f") {
            colorMoralis.set("landId", allId[i]);
            colorMoralis.set("color", fromMXR);
        } else {
            colorMoralis.set("landId", allId[i]);
            colorMoralis.set("color", hasBought);
        }
        colorMoralis.save();
    }
}
