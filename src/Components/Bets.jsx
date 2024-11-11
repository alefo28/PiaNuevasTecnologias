import React, { useEffect, useRef, useState } from "react";
import img from "../assets/pngwing.com.png";

export default function Bets({
  apuestaSelected,
  setSelected,
  selectedFicha,
  setSelectedFicha,
  fichasUser,
  setFichas,
}) {
  const fichasPosibles = [1, 5, 25, 50, 100, 200, 500, 1000];

  /* const [fichasIniciales, setFichasIniciales] = useState(fichasUser);
  useEffect(() => {
    setFichasIniciales(fichasUser);
  }, [fichasUser]); */

  const handleSelect = (value) => {
    if (selectedFicha !== 0 && fichasUser >= selectedFicha) {
      setSelected((prevSelected) => {
        const apuestaExistente = prevSelected.find(
          (apuesta) => apuesta.value === value
        );

        if (apuestaExistente) {
          // Si ya existe la apuesta, suma la cantidad de la ficha seleccionada
          return prevSelected.map((apuesta) =>
            apuesta.value === value
              ? {
                  ...apuesta,
                  cantidad: apuesta.cantidad + (selectedFicha || 0),
                }
              : apuesta
          );
        } else {
          // Si no existe, añade la nueva apuesta con la cantidad de la ficha seleccionada
          return [...prevSelected, { value, cantidad: selectedFicha || 0 }];
        }
      });
      setFichas(fichasUser - selectedFicha);
    } else {
      // Si no hay suficientes fichas, muestra un mensaje de advertencia
      alert("No tienes suficientes fichas ");
    }
  };

  const numbers = [
    [
      { name: "3", type: "number" },
      { name: "6", type: "number" },
      { name: "9", type: "number" },
      { name: "12", type: "number" },
      { name: "15", type: "number" },
      { name: "18", type: "number" },
      { name: "21", type: "number" },
      { name: "24", type: "number" },
      { name: "27", type: "number" },
      { name: "30", type: "number" },
      { name: "33", type: "number" },
      { name: "36", type: "number" },
      { name: "2to1", type: "2to1-1" },
    ],
    [
      { name: "2", type: "number" },
      { name: "5", type: "number" },
      { name: "8", type: "number" },
      { name: "11", type: "number" },
      { name: "14", type: "number" },
      { name: "17", type: "number" },
      { name: "20", type: "number" },
      { name: "23", type: "number" },
      { name: "26", type: "number" },
      { name: "29", type: "number" },
      { name: "32", type: "number" },
      { name: "35", type: "number" },
      { name: "2to1", type: "2to1-2" },
    ],
    [
      { name: "1", type: "number" },
      { name: "4", type: "number" },
      { name: "7", type: "number" },
      { name: "10", type: "number" },
      { name: "13", type: "number" },
      { name: "16", type: "number" },
      { name: "19", type: "number" },
      { name: "22", type: "number" },
      { name: "25", type: "number" },
      { name: "28", type: "number" },
      { name: "31", type: "number" },
      { name: "34", type: "number" },
      { name: "2to1", type: "2to1-3" },
    ],
  ];

  const getCellClass = (num) => {
    if (num === "2to1") return ""; // Color para 2to1

    // Números rojos en la ruleta europea en formato string
    const redNumbers = [
      "1",
      "3",
      "5",
      "7",
      "9",
      "12",
      "14",
      "16",
      "18",
      "19",
      "21",
      "23",
      "25",
      "27",
      "30",
      "32",
      "34",
      "36",
    ];

    return redNumbers.includes(num) ? "bg-red-700" : "bg-black";
  };

  const checkApuesta = (check) => {
    if (selectedFicha !== 0) {
      return apuestaSelected.some((apuesta) => apuesta.value === check);
    }
    return false;
  };

  const getApuestaInfo = (value) => {
    const apuesta = apuestaSelected.find((ap) => ap.value === value);
    return apuesta ? apuesta.cantidad : null;
  };

  const canSelectFicha = (ficha, fichasUser) => {
    return fichasUser >= ficha;
  };

  // Función para manejar el clic en una ficha
  const handleFichaClick = (ficha) => {
    if (canSelectFicha(ficha, fichasUser)) {
      setSelectedFicha((prevSelectedFicha) => {
        // Lógica para manejar el cambio de ficha seleccionada
        if (prevSelectedFicha === ficha) {
          // Si ya está seleccionada, no cambia nada
          return prevSelectedFicha;
        } else {
          // Si no está seleccionada, la establece como ficha seleccionada
          return ficha;
        }
      });
    } else {
      alert(`No tienes suficientes fichas.`);
    }
  };

  const handleReset = () => {
    const totalApuesta = apuestaSelected.reduce(
      (acc, apuesta) => acc + apuesta.cantidad,
      0
    );
    setFichas((prevFichas) => prevFichas + totalApuesta);
    setSelected([]); // Restablece las apuestas
  };

  return (
    <div className=" flex justify-center w-full">
      <div className="w-full">
        <div className="text-white flex justify-center">
          <div>
            Fichas:
            <div className="flex gap-2 mt-2">
              {fichasPosibles.map((ficha) => (
                <button
                  key={ficha}
                  onClick={() => handleFichaClick(ficha)}
                  className={`relative w-16 h-16 flex justify-center items-center rounded-full border-2 border-gray-400 transition ${
                    selectedFicha === ficha
                      ? "border-yellow-500 shadow-lg shadow-yellow-500/50"
                      : "opacity-50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Ficha de ${ficha}`}
                    className={`w-full h-full object-cover rounded-full ${
                      selectedFicha === ficha ? "opacity-100" : "opacity-75"
                    }`}
                  />
                  <span className="absolute font-bold text-white text-sm">
                    {ficha}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full p-10">
          <table className="border-collapse w-full border border-white text-white table-fixed">
            <thead></thead>
            <tbody>
              <tr>
                <td></td>
                <td
                  colSpan="4"
                  onClick={() => handleSelect("1-12")}
                  className={`text-center py-2 border border-white text-white cursor-pointer
                    ${
                      checkApuesta("1-12") ? "bg-yellow-500" : ""
                    } hover:bg-gray-600 cursor-pointer`}
                >
                  {checkApuesta("1-12") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("1-12")}</span>
                    </div>
                  ) : (
                    "1-12"
                  )}
                </td>

                <td
                  colSpan="4"
                  onClick={() => handleSelect("13-24")}
                  className={`text-center py-2 border border-white text-white cursor-pointer
                    ${
                      checkApuesta("13-24") ? "bg-yellow-500" : ""
                    } hover:bg-gray-600 cursor-pointer`}
                >
                  {checkApuesta("13-24") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("13-24")}</span>
                    </div>
                  ) : (
                    "13-24"
                  )}
                </td>
                <td
                  colSpan="4"
                  onClick={() => handleSelect("25-36")}
                  className={`text-center py-2 border border-white text-white cursor-pointer
                    ${
                      checkApuesta("25-36") ? "bg-yellow-500" : ""
                    } hover:bg-gray-600 cursor-pointer`}
                >
                  {checkApuesta("25-36") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("25-36")}</span>
                    </div>
                  ) : (
                    "25-36"
                  )}
                </td>
                <td></td>
              </tr>

              {numbers.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td></td>
                  {row.map((num, index) => (
                    <td
                      key={index}
                      onClick={() =>
                        handleSelect(num.name === "2to1" ? num.type : num.name)
                      }
                      className={`text-center py-2 border border-white text-white ${getCellClass(
                        num.name
                      )} 
                  ${
                    checkApuesta(num.name === "2to1" ? num.type : num.name)
                      ? "bg-yellow-500"
                      : ""
                  }
                  hover:bg-gray-600 cursor-pointer`}
                    >
                      {checkApuesta(
                        num.name === "2to1" ? num.type : num.name
                      ) ? (
                        <div className="flex items-center justify-center">
                          <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                          <span>
                            {getApuestaInfo(
                              num.name === "2to1" ? num.type : num.name
                            )}
                          </span>
                        </div>
                      ) : (
                        num.name
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td
                  onClick={() => handleSelect("0")}
                  className={`text-center py-2 border border-white text-white hover:bg-gray-600 cursor-pointer
                    ${checkApuesta("0") ? "bg-yellow-500" : " bg-green-600"}`}
                >
                  {checkApuesta("0") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("0")}</span>
                    </div>
                  ) : (
                    "0"
                  )}
                </td>
                <td
                  colSpan="2"
                  onClick={() => handleSelect("1-18")}
                  className={`text-center py-2 border border-white text-white hover:bg-gray-600 cursor-pointer
              ${checkApuesta("1-18") ? "bg-yellow-500" : ""}`}
                >
                  {checkApuesta("1-18") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("1-18")}</span>
                    </div>
                  ) : (
                    "1-18"
                  )}
                </td>

                <td
                  colSpan="2"
                  onClick={() => handleSelect("Even")}
                  className={`text-center py-2 border border-white text-white hover:bg-gray-600 cursor-pointer
              ${checkApuesta("Even") ? "bg-yellow-500" : ""}`}
                >
                  {checkApuesta("Even") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("Even")}</span>
                    </div>
                  ) : (
                    "Even"
                  )}
                </td>
                <td
                  colSpan="2"
                  onClick={() => handleSelect("Red")}
                  className={`text-center py-2 border border-white text-white bg-red-700 hover:bg-gray-600 cursor-pointer
                    ${checkApuesta("Red") ? "bg-yellow-500" : ""}`}
                >
                  {checkApuesta("Red") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("Red")}</span>
                    </div>
                  ) : (
                    "Red"
                  )}
                </td>
                <td
                  colSpan="2"
                  onClick={() => handleSelect("Black")}
                  className={`text-center py-2 border border-white text-white bg-black hover:bg-gray-600 cursor-pointer
                    ${checkApuesta("Black") ? "bg-yellow-500" : ""}`}
                >
                  {checkApuesta("Black") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("Black")}</span>
                    </div>
                  ) : (
                    "Black"
                  )}
                </td>
                <td
                  colSpan="2"
                  onClick={() => handleSelect("Odd")}
                  className={`text-center py-2 border border-white text-white hover:bg-gray-600 cursor-pointer
              ${checkApuesta("Odd") ? "bg-yellow-500" : ""}`}
                >
                  {checkApuesta("Odd") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("Odd")}</span>
                    </div>
                  ) : (
                    "Odd"
                  )}
                </td>
                <td
                  colSpan="2"
                  onClick={() => handleSelect("19-36")}
                  className={`text-center py-2 border border-white text-white hover:bg-gray-600 cursor-pointer
              ${checkApuesta("19-36") ? "bg-yellow-500" : ""}`}
                >
                  {checkApuesta("19-36") ? (
                    <div className="flex items-center justify-center">
                      <img src={img} alt="Ficha" className="w-6 h-6 mr-1" />
                      <span>{getApuestaInfo("19-36")}</span>
                    </div>
                  ) : (
                    "19-36"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <button
              className="bg-red-600 text-white font-bold mt-2 py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              onClick={handleReset} // Restablece las apuestas al hacer clic
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
