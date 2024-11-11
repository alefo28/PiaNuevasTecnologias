import Web3 from "web3";
import { set_provider } from "./metamask";

/* let web3 = null;
const contractABI = require("../Contracts/CISI.json");
const contractAddress = "0x60e645EFcdFF00A17434AB38FEA19a33Be1825b7";

export const CISIContract = set_provider().then(
  function (provider) {
    web3 = new Web3(provider);
    return new web3.eth.Contract(contractABI, contractAddress);
  },
  function (error) {
    console.log(error);
  }
); */

export const getFichas = async () => {
  return 100;
};

export const buyFichas = async (fichas, Eth, account) => {
  console.log(fichas, Eth, account);
};

export const changeFichas = async (fichas, account) => {
  console.log(fichas, account);
};

export const MakeBet = async (fichas, account) => {
  console.log(fichas, account);
};

export const WinBet = async (fichas, account) => {
  console.log(fichas, account);
};
