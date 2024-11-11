import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

// Definimos los datos de la ruleta con los colores correspondientes a un casino


export default ({ mustSpin, setMustSpin, prizeNumber, data , checkIfWinner}) => {
  return (
    <>
      <div className=" flex justify-center mt-10">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            checkIfWinner(prizeNumber)
          }}
          textDistance={80} // Aumenta la distancia de los números desde el centro
          spinDuration={1} // Aumenta la duración del giro para hacerla más visible
          innerRadius={40}
          innerBorderColor="#282216"
          outerBorderColor="#282216"
          innerBorderWidth={30}
          outerBorderWidth={15}
          fontSize={`15`} // Aumenta el tamaño de la fuente
          radiusLineColor="#cea16b" // Color de las líneas radiales
          radiusLineWidth={5}
        />
      </div>
    
    </>
  );
};
