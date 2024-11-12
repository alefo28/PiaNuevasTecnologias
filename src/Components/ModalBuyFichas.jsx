import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import img from "../assets/pngwing.com.png";
import { buyFichas, getFichas } from "../conections/service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalBuyFichas({ fichas, setFichas, account }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0); // Estado para la cantidad de fichas

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      // Asegura que solo se ingrese un número entero
      setAmount(value);
    }
  };

  const handleBuy = async () => {
    // Lógica para la compra de fichas
    try {
      await buyFichas(amount, amount / 1000, account);
      const {customer, chips} = await getFichas(account);
      setFichas((prevFichas) => prevFichas + Number(amount));
      setAmount(0);
      alert("Transaccion exitosa para la cuenta " + customer.slice(0,5) + "..." + customer.slice(-5));
      handleClose();
    } catch (error) {
      alert("Transaccion fallida...");
      handleClose();
    }
    // Cierra el modal después de la compra
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="w-32 h-10 bg-black text-yellow-500 border border-yellow-500 rounded hover:bg-gray-800"
      >
        {fichas} Fichas
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comprar Fichas
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", alignItems: "center" }}
          >
            <img
              src={img}
              alt="ETH logo"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            1000 Fichas = 1 ETH
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography>
              Ingresa la cantidad de fichas que deseas comprar:
            </Typography>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Cantidad de fichas"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="body2">
              {amount > 0 ? `${amount / 1000} ETH` : "0 ETH"}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <button
              onClick={handleBuy}
              className="w-full bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400"
            >
              Comprar
            </button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
