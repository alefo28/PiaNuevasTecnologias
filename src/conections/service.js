import Web3 from "web3";
import { set_provider } from "./metamask";
import contractABI from "../Contracts/SmartGamble.json";
import { useNavigate } from "react-router-dom";

let web3 = null;
  // const contractABI = require("../Contracts/SmartGamble.json");
  const contractAddress = "0xcC1ee0B98247a0b17ca7d2AB5842e850c61716B1";

export const Contract = set_provider().then(
  function (provider) {
    web3 = new Web3(provider);
    return new web3.eth.Contract(contractABI, contractAddress);
  },
  function (error) {
    console.log(error);
  }
);

export const setCustomer = async (account) => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");
    // Verifica que el contrato esté inicializado
    // Verifica que la cuenta esté definida
    if (!account) throw new Error("Account address is undefined.");
  
    // Llama a la función setCustomer con el envío de transacción
    const receipt = await contractInstance.methods
      .setCustomer(account)
      .send({ 
        from: account,
      });
    return receipt;
  } catch (error) {
    console.error("Error en setCustomer:", error.message);
    throw error; // Re-lanza el error si deseas manejarlo externamente
  }
};

export const getFichas = async (account) => {
  try {
    // Espera a que Contract esté resuelto antes de llamar métodos
    const contractInstance = await Contract;
    if (!contractInstance) {
      throw new Error("Contract instance not initialized.");
    }
    if (!account) throw new Error("Account address is undefined.");

    // Llama a getCustomer de forma segura
    const customer = await contractInstance.methods.getCustomer().call({from: account});

    if(customer == "") 
      throw new Error("Nombre vacio");

    let chips = (await contractInstance.methods.getCustomerChips().call({from: account}));
    chips = chips.toString();

    return {customer, chips};
  } catch (error) {
    console.error("Error in getFichas:", error.message);
    // Maneja el error y retorna un valor predeterminado o un mensaje adecuado
    return null;
  }
};

export const buyFichas = async (fichas, Eth, account) => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");

    if (!account) throw new Error("Account address is undefined.");

    const EthInWei = Eth * 10 ** 18;
    // Llama al método buyChips del contrato
    const transaction = await contractInstance.methods.buyChips(fichas).send({
      from: account,
      value: EthInWei,
    });

    return transaction;
  } catch (error) {
    console.error("Error in buyFichas:", error.message);
    throw error; // Para manejar el error externamente si es necesario
  }
};

//No esta agregando los ETH en el metamask
export const changeFichas = async (fichas, account) => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");
    if (!account) throw new Error("Account address is undefined.");

    const transaction = await contractInstance.methods
      .customerCashOut(fichas)
      .send({
        from: account,
      });

    return transaction;
  } catch (error) {
    console.error("Error in buyFichas:", error.message);
    throw error; // Para manejar el error externamente si es necesario
  }
};

export const LoseBet = async (fichas, account) => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");

    // Llamar a decrementChips en el contrato con las fichas que se van a decrementar
    const transaction = await contractInstance.methods
      .decrementChips(fichas)
      .send({
        from: account,
      });

    return transaction;
  } catch (error) {
    console.error("Error in LoseBet:", error.message);
    throw error; // Si necesitas manejar el error externamente
  }
};

export const WinBet = async (fichas, account) => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");

    // Llamar a decrementChips en el contrato con las fichas que se van a decrementar
    const transaction = await contractInstance.methods
      .incrementChips(fichas)
      .send({
        from: account,
      });

    ("Bet placed successfully:", transaction);
    return transaction;
  } catch (error) {
    console.error("Error in LoseBet:", error.message);
    throw error; // Si necesitas manejar el error externamente
  }
};

export const isOwner = async (account) => {
  try{
    // Espera a que Contract esté resuelto antes de llamar métodos
    const contractInstance = await Contract;
    if (!contractInstance) {
      throw new Error("Contract instance not initialized.");
    }
    if (!account) throw new Error("Account address is undefined.");

    // Llama a getCustomer de forma segura
    const owner = await contractInstance.methods.owner().call({from: account});
    if(account != owner)
      useNavigate('/');
    return owner;
  } catch(error){
    console.error("Error in isOwner:", error.message);
  }
}

export const setFunds = async (account, fundsInEth) => {
  try{
    // Espera a que Contract esté resuelto antes de llamar métodos
    const contractInstance = await Contract;
    if (!contractInstance) {
      throw new Error("Contract instance not initialized.");
    }
    if (!account) throw new Error("Account address is undefined.");

    // Llama a getCustomer de forma segura
    const receipt = await contractInstance.methods.setFunds().send({from: account, value: fundsInEth});
    return receipt;
  } catch(error){
    console.error("Error in isOwner:", error.message);
  }
}

export const maxToCash = async () => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");

    // Llama al método buyChips del contrato
    const fichasMax = Number(await contractInstance.methods.geMinChipsToCash().call());

    return fichasMax;
  } catch (error) {
    console.error("Error in maxToCash:", error.message);
    throw error; // Para manejar el error externamente si es necesario
  }
}