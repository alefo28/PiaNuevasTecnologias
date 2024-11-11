import React from "react";
import ModalBuyFichas from "./ModalBuyFichas";
import ModalChangeFichas from "./ModalChangeFichas";

export default function Header({fichas, account, setFichas}) {
  return (
    <div className=" p-4 bg-black text-yellow-500 flex justify-between items-center">
      <div>{account}</div>
      <div className="flex space-x-4">
        
        <ModalBuyFichas fichas={fichas} setFichas={setFichas} account={account}/>
        <ModalChangeFichas fichas={fichas} setFichas={setFichas} account={account}/>
      </div>
    </div>
  );
}
