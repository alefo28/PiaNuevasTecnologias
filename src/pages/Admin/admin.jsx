import { useEffect, useState, useRef } from "react";
import "./admin.css"; // Asegúrate de importar el archivo CSS
import { set_provider } from "../../conections/metamask";
import { isOwner, ownerWithdraw, setFunds, setCustomer } from "../../conections/service";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const AdminPage = () => {
  const [fondos, setFondos] = useState(0);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [contractBalance, setContractBalance] = useState(null);

  const navigate = useNavigate();

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const isMountedRef = useRef(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const decimalPattern = /^[0-9]*\.?[0-9]*$/;

    // Validamos que el valor sea vacío, un número válido o un número decimal válido menor o igual al balance
    if (
      inputValue === "" || // Permite que el campo esté vacío
      (decimalPattern.test(inputValue) && parseFloat(inputValue) <= balance) // Acepta números enteros o decimales
    ) {
      setFondos(inputValue); // Si es válido, actualizamos el estado de fondos
    }
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      componentDidMount();
      isMountedRef.current = true;
    }

    // Función para manejar el cambio de cuenta
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null); // Si no hay cuentas conectadas
      }
      componentDidMount();
    };

    // Añadir el listener para cuando cambie la cuenta
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const componentDidMount = async () => {
    let accounts = await (
      await set_provider()
    ).request({
      method: "eth_requestAccounts",
    });
    const web3 = new Web3(window.ethereum);

    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const contractBalanceWei = await web3.eth.getBalance(contractAddress)
    const balanceETH = web3.utils.fromWei(balanceWei, "ether");
    const contractBalanceETH = web3.utils.fromWei(contractBalanceWei, "ether");
    setBalance(balanceETH);
    setContractBalance(contractBalanceETH);
    
    try {
      await isOwner(accounts[0], navigate);
    } catch (e) {
      navigate("/");
    } finally {
      setAccount(accounts[0]);
    }
  };

  const handleSacarFondos = async () => {
    try {
      await ownerWithdraw(account); // Llama a la función asíncrona
      window.location.reload(); // Recarga la página después de ejecutar la función
    } catch (error) {
      console.error("Error al sacar fondos:", error);
    }
  };

  const handleMandarFondos = async () => {
    try {
      await setFunds(account, fondos); // Llama a la función asíncrona
      window.location.reload(); // Recarga la página después de ejecutar la función
    } catch (error) {
      console.error("Error al mandar fondos:", error);
    }
  };
  return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <div className="flex flex-col space-y-4">
          <label htmlFor="fondos" className="text-black font-semibold">
            Ingrese fondos para el contrato:
          </label>
          <label htmlFor="" className="text-green-800 font-semibold">
            Fondos disponibles: {balance} ETH
          </label>
          <label htmlFor="" className="text-green-800 font-semibold">
            Fondos del Smart Contract: {contractBalance} ETH
          </label>
          <input
            type="text"
            id="fondos"
            className="border border-green-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={fondos}
            onChange={handleChange}
            placeholder="Ej. 100 ETH"
          />
          <div className="flex  justify-between space-x-4 mt-4">
            <button
              className="bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              onClick={handleSacarFondos}
            >
              Sacar Fondos
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
              onClick={handleMandarFondos}
            >
              Mandar Fondos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
