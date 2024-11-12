import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import img from "../assets/pngwing.com.png";
import { changeFichas, maxToCash } from "../conections/service";

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

export default function ModalChangeFichas({ fichas, setFichas, account }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [max, setMax] = useState(0);
  const handleOpen = async () => {
    //Checar el maximo de fichas a canjear
    let max = await maxToCash();
    setMax(max);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= parseInt(fichas))) {
      setAmount(value); // Solo actualiza si el valor es un número válido y menor o igual a las fichas disponibles
    }
  };

  const handleChange = async () => {
    if (amount > 0 && amount <= fichas && amount <= max) {
      console.log(account);
      // Si la cantidad es válida, se realiza el cambio (por ejemplo, se convierten las fichas a ETH)
      // const ethAmount = amount / 1000; // Suponiendo que 1000 fichas = 1 ETH
      await changeFichas(amount, account);
      setFichas(fichas - amount); // Descontamos las fichas
      handleClose(); // Cierra el modal después del cambio
    } else {
      alert("Ingresa una cantidad válida de fichas");
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="w-32 h-10 bg-black text-yellow-500 border border-yellow-500 rounded hover:bg-gray-800"
      >
        Cambiar fichas
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cambiar Fichas a ETH
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex" }}
          >
            {fichas} fichas disponibles.
          </Typography>
          <Typography sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <img
              src={img}
              alt="ETH logo"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            1000 Fichas = 1 ETH
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography>
              Ingresa la cantidad de fichas que deseas cambiar (Maximo: {max}):
            </Typography>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Cantidad de fichas"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              {amount > 0 ? `${amount / 1000} ETH` : "0 ETH"}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              onClick={handleChange}
              variant="contained"
              color="primary"
              fullWidth
            >
              Cambiar a ETH
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
