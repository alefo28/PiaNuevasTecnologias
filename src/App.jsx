import { useEffect, useState, useRef } from "react";

import Roulette from "./Components/Roulette";
import Header from "./Components/header";
import Bets from "./Components/Bets";
import { set_provider } from "./conections/metamask";
import { getFichas, LoseBet, setCustomer, WinBet } from "./conections/service";

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "32", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "15", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "19", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "4", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "21", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "2", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "25", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "17", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "34", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "6", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "27", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "13", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "36", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "11", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "30", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "8", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "23", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "10", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "5", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "24", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "16", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "33", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "1", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "20", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "14", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "31", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "9", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "22", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "18", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "29", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "7", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "28", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "12", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "35", style: { backgroundColor: "#21221c", textColor: "white" } },
  { option: "3", style: { backgroundColor: "#9d0b02", textColor: "white" } },
  { option: "26", style: { backgroundColor: "#21221c", textColor: "white" } },
];

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [apuestaSelected, setSelected] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState(0);
  const [fichas, setFichas] = useState(0);

  const [account, setAccount] = useState("");

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      componentDidMount();
      isMountedRef.current = true;
    }

    // Función para manejar el cambio de cuenta
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        componentDidMount();
      } else {
        setAccount(null); // Si no hay cuentas conectadas
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

    try {
      let { customer, chips } = await getFichas(accounts[0]);
      setFichas(chips);

    } catch (e) {
      alert("Tienes una transacción pendiente!!\nInicia sesion con tu nueva cuenta");
      await setCustomer(accounts[0]);

    } finally {
      setAccount(accounts[0]);
    }
  };

  const apuestasPosibles = {
    "1-12": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    "13-24": [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    "25-36": [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    "1-18": [3, 6, 9, 12, 15, 18, 1, 4, 7, 10, 13, 16],
    "19-36": [19, 22, 25, 28, 31, 34, 18, 21, 24, 27, 30, 33, 36],
    Even: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
    Odd: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
    Red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
    Black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
    "2to1-1": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    "2to1-2": [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    "2to1-3": [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  };

  const checkIfWinner = async (winningOption) => {
    // Verificar si la apuesta seleccionada es válida para cada tipo de apuesta
    const checkCategory = (category, option) => {
      return apuestasPosibles[category].includes(option);
    };
    let apuestaGanada = [];
    let apuestaPerdedora = [];

    // Recorrer las apuestas seleccionadas y comprobar si alguna de ellas es ganadora
    apuestaSelected.some((apuesta) => {
      if (apuesta.value === toString(winningOption)) {
        apuestaGanada.push(apuesta); // Apuesta ganadora
      } else if (isNaN(parseFloat(apuesta.value)) || !isFinite(apuesta.value)) {
        // Si no es un número (es una categoría)
        if (checkCategory(apuesta.value, winningOption)) {
          apuestaGanada.push(apuesta); // Apuesta ganadora (categoría)
        }
      }
      apuestaPerdedora.push(apuesta);
    });

    let fichasGanadas = 0;
    let fichasPerdidas = 0;

    apuestaGanada.forEach((apuesta) => {
      let multiplier = getMultiplier(apuesta.value);
      fichasGanadas += apuesta.cantidad * multiplier;
    });

    apuestaPerdedora.forEach((apuesta) => {
      fichasPerdidas += apuesta.cantidad;
    });

    setFichas((prevFichas) => prevFichas + fichasGanadas);

    if (fichasGanadas > 0) {
      alert("¡Felicidades, has ganado!");
      await WinBet(fichasGanadas, account);
    }
    if (fichasPerdidas > 0) {
      await LoseBet(fichasPerdidas, account);
    }
    if (fichasGanadas == 0 && fichasPerdidas > 0) {
      alert("Lo siento, no has ganado esta vez.");
    }
    setSelected([]);
  };

  const getMultiplier = (category) => {
    switch (category) {
      case "Red":
      case "Black":
      case "Odd":
      case "Even":
        return 2; // Ejemplo para "impar"
      case "0":
        return 35; // Ejemplo para "verde"
      case "1-18":
      case "19-36":
        return 2; // Ejemplo para "19-36"
      case "1-12":
      case "13-24":
      case "25-36":
        return 3; // Ejemplo para "19-36"
      case "2to1-1":
      case "2to1-2":
      case "2to1-3":
        return 3;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
      case "11":
      case "12":
      case "13":
      case "14":
      case "15":
      case "16":
      case "17":
      case "18":
      case "19":
      case "20":
      case "21":
      case "22":
      case "23":
      case "24":
      case "25":
      case "26":
      case "27":
      case "28":
      case "29":
      case "30":
      case "31":
      case "32":
      case "33":
      case "34":
      case "35":
      case "36":
        return 35;
      default:
        return 1; // Si no hay coincidencia, el multiplicador será 1
    }
  };

  // Función para manejar el clic de giro
  const handleSpinClick = async () => {
    if (apuestaSelected.length === 0) {
      alert("Por favor, selecciona una apuesta antes de girar.");
      return; // Sale de la función sin realizar ninguna acción
    }

    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);

      setMustSpin(true);
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-green-800 ">
        <Header fichas={fichas} account={account} setFichas={setFichas} />
        <div className="flex mt-10 mx-10 items-center justify-center">
          <Roulette
            mustSpin={mustSpin}
            setMustSpin={setMustSpin}
            prizeNumber={prizeNumber}
            data={data}
            checkIfWinner={checkIfWinner}
          />
          <Bets
            apuestaSelected={apuestaSelected}
            setSelected={setSelected}
            selectedFicha={selectedFicha}
            setSelectedFicha={setSelectedFicha}
            fichasUser={fichas}
            setFichas={setFichas}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded border-white"
            onClick={handleSpinClick}
          >
            APOSTAR
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
