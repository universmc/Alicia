// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TreasuryGuard {
    // Déclaration de variables
    address public owner; // Adresse du propriétaire du contrat
    uint256 public treasuryAmount; // Montant initial du trésor
    bool public inSafeZone; // Indicateur de sécurité

    // Événements pour suivre les transactions
    event TransactionAuthorized(address indexed executor, uint256 amount, string destination);
    event TransactionBlocked(address indexed executor, uint256 amount, string reason);

    // Constructeur : initialise le contrat
    constructor(uint256 _initialAmount) {
        owner = msg.sender; // L'adresse qui déploie le contrat devient le propriétaire
        treasuryAmount = _initialAmount;
        inSafeZone = true; // Initialisation de la zone de sécurité
    }

    // Modificateur pour restreindre l'accès au propriétaire uniquement
    modifier onlyOwner() {
        require(msg.sender == owner, "Seul le propriétaire peut exécuter cette fonction.");
        _;
    }

    // Fonction pour autoriser une transaction sécurisée
    function authorizeTransaction(uint256 amount, string memory destination) public onlyOwner {
        require(amount <= treasuryAmount, "Montant insuffisant dans le trésor.");
        require(keccak256(abi.encodePacked(destination)) == keccak256(abi.encodePacked("zone_sécurisée")), "Destination non sécurisée.");

        treasuryAmount -= amount; // Déduire le montant du trésor
        emit TransactionAuthorized(msg.sender, amount, destination); // Émettre un événement de transaction autorisée
    }

    // Fonction pour bloquer une transaction non sécurisée
    function blockTransaction(uint256 amount, string memory reason) public onlyOwner {
        inSafeZone = false; // Marquer que le trésor est en danger
        emit TransactionBlocked(msg.sender, amount, reason); // Émettre un événement de transaction bloquée
    }

    // Fonction pour restaurer la sécurité du trésor
    function restoreSafeZone() public onlyOwner {
        inSafeZone = true; // Restaurer l'état sécurisé
    }

    // Fonction pour vérifier le montant actuel dans le trésor
    function getTreasuryAmount() public view returns (uint256) {
        return treasuryAmount;
    }
}
