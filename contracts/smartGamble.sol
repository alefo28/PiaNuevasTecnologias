// SPDX-License-Identifier: None

pragma solidity ^0.8.17;

contract PIANT_2024{
    address public owner;
    uint256 public chipsToTokenRatio = 1e15; //1 Ficha = .001 ETH -- 1000000000000000
    uint256 public minimumBalance = 1e17 wei; //Balance minumo .1 ETH -- 100000000000000000

    struct Customer {
        string name;
        uint256 chips;
    }
    
    mapping(address => Customer) customers;

    constructor() {
        owner = msg.sender;
    }

    //Get Customer
    function getCustomer() public  is_Registered view returns (string memory) {
        Customer memory customer = customers[msg.sender];
        return customer.name;
    }

    //Get Customer
    function getCustomerChips() public  is_Registered view returns (uint256) {
        Customer memory customer = customers[msg.sender];
        return customer.chips;
    }

    //Set Customer
    function setCustomer(string memory name) public {
        require (keccak256(abi.encodePacked(customers[msg.sender].name)) == keccak256(abi.encodePacked("")), "La cuenta ya esta registrada");
        Customer storage customer = customers[msg.sender];
        customer.name = name;
        customer.chips = 0;
    }
    //Buy chips
    function buyChips(uint256 chips) public is_Registered payable {
        require(msg.value == chips*chipsToTokenRatio); //Valor en wei
        Customer storage customer = customers[msg.sender];
        customer.chips += chips;
    }

    //Update chips count
    function decrementChips(uint256 chipsLost) public is_Registered {
        require(customers[msg.sender].chips > 0, "Necesita comprar fichas antes.");
        Customer storage customer = customers[msg.sender];
        require(customer.chips >= chipsLost, "No puedes perder mas fichas de las que tienes.");

        // Actualiza el contador de fichas
        customer.chips -= chipsLost; // Pierde fichas
    } 

    //Update chips count
    function incrementChips(uint256 chipsWon) public is_Registered {
        require(customers[msg.sender].chips > 0, "Necesita comprar fichas antes.");
        Customer storage customer = customers[msg.sender];

        // Actualiza el contador de fichas
        customer.chips += chipsWon;  // Gana fichas
    } 

    //CashOut Customer
    function customerCashOut(uint256 chips) public is_Registered max_Tokens(chips){
        require(customers[msg.sender].chips >= chips && customers[msg.sender].chips > 0, "No tiene suficientes fichas para retirar");

        uint256 tokens = chips * chipsToTokenRatio;
        customers[msg.sender].chips -= chips;

        payable(msg.sender).transfer(tokens);
    }
    
    //CashOut Owner
    function ownerWithdraw() public is_Owner{
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "El contrato no tiene Ether");
        
        payable(owner).transfer(contractBalance);
    }

    //Owner set funds
    function setFunds() public payable is_Owner{}

    function geMinChipsToCash() public view returns (uint256){
        require(address(this).balance > minimumBalance, "No hay fondos en este momento");

        return uint256 ((address(this).balance - minimumBalance) / chipsToTokenRatio)-1;
    }

    //Modifier: Is Registered
    modifier is_Registered(){
        Customer memory customer = customers[msg.sender];
        require(bytes(customer.name).length > 0, "Usuario no registrado.");
        _;
    }

    //Modifier: Is Owner
    modifier is_Owner() {
        require(msg.sender == owner);
        _;
    }

    //Modifier: Doesn't exceed max tokens
    modifier max_Tokens(uint256 chips){
        require(address(this).balance > minimumBalance, "No hay fondos en este momento");

        uint256 minChips = (address(this).balance - minimumBalance) / chipsToTokenRatio;

        // Verificar que el número de fichas solicitadas sea suficiente
        require(minChips > chips, "No se pueden retirar esa cantidad de fichas");

        // Verificar si el contrato tiene suficiente saldo
        require(address(this).balance > (chips * chipsToTokenRatio) + minimumBalance, "Saldo insuficiente.");
        _;
    }
}