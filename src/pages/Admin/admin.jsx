import { useEffect, useState } from "react";
import "./admin.css"; // Asegúrate de importar el archivo CSS
import { set_provider } from "../../conections/metamask";
import { isOwner } from "../../conections/service";
import { useNavigate } from "react-router-dom";


const AdminPage = () => {
  const [fondos, setFondos] = useState("");
  const [account, setAccount] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFondos(e.target.value);
  };

  useEffect(() => {
    if (!isMounted) {
      componentDidMount();
      setIsMounted(true);
    }

    // Función para manejar el cambio de cuenta
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null); // Si no hay cuentas conectadas
      }
      try {
      } catch (e) {
        await setCustomer(accounts[0]);
      }
    };

    // Añadir el listener para cuando cambie la cuenta
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [isMounted]);

  const componentDidMount = async () => {
    let accounts = await (
      await set_provider()
    ).request({
      method: "eth_requestAccounts",
    });

    try {
      await isOwner(accounts[0], navigate);
    } catch (e) {
      await setCustomer(accounts[0]);
    } finally {
      setAccount(accounts[0]);
    }
  };

  return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <div className="flex flex-col space-y-4">
          <label htmlFor="fondos" className="text-green-800 font-semibold">
            Ingrese fondos para el contrato:
          </label>
          <input
            type="text"
            id="fondos"
            className="border border-green-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={fondos}
            onChange={handleChange}
            placeholder="Ej. 100 ETH"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
