// Suppression de l'import inutilisé si vous n'avez pas besoin de groq-sdk
// const Groq = require('groq-sdk');
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Variables globales pour la gestion des niveaux
let userLevel = 1;
let treasury = {
  amount: 1000, // Montant initial du trésor
  inSafeZone: true, // Indicateur de sécurité
};
let generosityScore = 0;

// Fonction pour vérifier si le montant reste dans la zone sécurisée
function checkTreasuryStatus() {
  if (!treasury.inSafeZone) {
    console.log("Alerte : L'argent du trésor est sur le point de quitter la zone sécurisée !");
    // Action : bloquer la transaction ou renvoyer les fonds dans le trésor
    blockTransaction();
  } else {
    console.log("Le trésor est sécurisé. Aucun risque d'évasion détecté.");
  }
}

// Fonction pour simuler une tentative de transaction
function attemptTransaction(amount, destination) {
  console.log(`Tentative de transfert de ${amount} vers ${destination}...`);

  // Vérifier si la transaction reste dans la zone sécurisée
  if (destination === "zone_sécurisée") {
    treasury.amount -= amount;
    console.log(`Transaction autorisée. Montant restant dans le trésor : ${treasury.amount}`);
  } else {
    treasury.inSafeZone = false;
    console.log("Transaction bloquée ! Vous ne pouvez pas transférer les fonds en dehors du périmètre sécurisé.");
    checkTreasuryStatus();
  }
}

// Fonction pour démarrer un niveau
function startLevel() {
  console.log(`Bienvenue au Niveau ${userLevel}`);
  if (userLevel === 1) {
    console.log("Vous apprenez les bases de la gestion des recettes publiques.");
  } else {
    console.log("Les défis deviennent plus complexes à mesure que vous progressez !");
  }
}

// Fonction pour simuler un défi avec une saisie utilisateur (adapté pour Node.js)
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function simulateChallenge() {
  readline.question("Protéger vos recettes (1) ou Investir dans un projet social (2) ? ", (decision) => {
    if (decision === "1") {
      treasury.amount += 100;
      console.log("Vous avez protégé vos recettes ! Trésor actuel : " + treasury.amount);
    } else if (decision === "2") {
      generosityScore += 50;
      console.log("Votre score de générosité a augmenté ! Score : " + generosityScore);
    } else {
      console.log("Choix invalide. Essayez encore.");
    }

    readline.close();
  });
}

// Exemple de montée en température
function increaseDifficulty() {
  userLevel++;
  simulateChallenge();
}

// Lancer le premier niveau
startLevel();
simulateChallenge();
