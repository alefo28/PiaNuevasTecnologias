import Web3 from "web3";
import { set_provider } from "./metamask";
import contractABI from "../Contracts/SmartGamble.json";

let web3 = null;
/* const contractABI = require("../Contracts/SmartGamble.json");
 */ const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

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
    // Verifica que el contrato esté inicializado
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");

    // Verifica que la cuenta esté definida
    if (!account) throw new Error("Account address is undefined.");

    // Llama a la función setCustomer con el envío de transacción
    const receipt = await contractInstance.methods
      .setCustomer(account)
      .send({ from: account });
    return receipt;
  } catch (error) {
    console.error("Error en setCustomer:", error.message);
    throw error; // Re-lanza el error si deseas manejarlo externamente
  }
};

//No esta funcionando me sale error
export const getFichas = async () => {
  try {
    // Espera a que Contract esté resuelto antes de llamar métodos
    /* const contractInstance = await Contract;
    if (!contractInstance) {
      throw new Error("Contract instance not initialized.");
    }

    // Llama a getCustomer de forma segura
    const customer = await contractInstance.methods.getCustomer().call();
    console.log("Customer data:", customer); */
    


    return 0;
  } catch (error) {
    console.error("Error in getFichas:", error.message);
    // Maneja el error y retorna un valor predeterminado o un mensaje adecuado
    return null;
  }

  return 100;
};

export const buyFichas = async (fichas, Eth, account) => {
  try {
    const contractInstance = await Contract;
    if (!contractInstance)
      throw new Error("Contract instance not initialized.");

    const EthInWei = Eth * 10 ** 18;
    // Llama al método buyChips del contrato
    const transaction = await contractInstance.methods.buyChips(fichas).send({
      from: account,
      value: EthInWei,
    });

    console.log("Transaction successful:", transaction);
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

    const transaction = await contractInstance.methods
      .customerCashOut(fichas)
      .send({
        from: account,
      });

    console.log("Transaction successful:", transaction);
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

    console.log("Bet placed successfully:", transaction);
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

    console.log("Bet placed successfully:", transaction);
    return transaction;
  } catch (error) {
    console.error("Error in LoseBet:", error.message);
    throw error; // Si necesitas manejar el error externamente
  }
};
