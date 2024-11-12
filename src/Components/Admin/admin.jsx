import { useEffect, useState } from 'react';
import './admin.css';  // Asegúrate de importar el archivo CSS
import { set_provider } from "../../conections/metamask";
import { isOwner } from '../../conections/service';

const AdminPage = () => {
  const [fondos, setFondos] = useState('');
  const [account, setAccount] = useState("");

  const handleChange = (e) => {
    setFondos(e.target.value);
  };

  useEffect(() => {
    componentDidMount();

    // Función para manejar el cambio de cuenta
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null); // Si no hay cuentas conectadas
      }
      try{
        let owner = await getOwner(accounts[0]);
        console.log(owner);
      }catch (e){
      }
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

    // try{
    //   console.log(accounts[0]);
    //   let owner = await isOwner(accounts[0]);
    //   console.log(owner);
    // }catch (e){}
  }

  // useEffect(() => {
  //   // Se asegura de manejar la llamada asíncrona correctamente dentro de useEffect
  //   const checkOwnerAsync = async () => {
  //     try {
  //       const accounts = await (
  //         await set_provider()
  //       ).request({
  //         method: "eth_requestAccounts",
  //       });

  //       console.log("Aquí " + accounts[0]);

  //       const ownerStatus = await isOwner(accounts[0]);
  //       console.log(ownerStatus);
  //     } catch (error) {
  //       console.log("Error en checkOwner:", error);
  //     }
  //   };

  //   checkOwnerAsync();
  // }, []); // Este useEffect solo se ejecuta una vez al montar el componente

  return (
    <div className="container">
      <div className="form-container">
        <label htmlFor="fondos" className="label">Ingrese fondos para el contrato:</label>
        <input
          type="text"
          id="fondos"
          className="input-box"
          value={fondos}
          onChange={handleChange}
          placeholder="Ej. 100 ETH"
        />
      </div>
    </div>
  );
};

export default AdminPage;
