// Définition du radar AI avec un niveau de compétence
const radarAI = {
    level: 1, // Niveau initial
    temperature: 1, // Température initiale de réaction (1 à 10)
    safeMode: true, // Indicateur de sécurité
    log: [], // Journal des actions du radar
  
    // Fonction pour monter en niveau
    levelUp: function() {
      if (this.level < 10) {
        this.level++;
        this.temperature = this.level; // Ajuster la température en fonction du niveau
        console.log(`Le radar AI a atteint le niveau ${this.level}.`);
      } else {
        console.log("Le radar est déjà au niveau maximum.");
      }
    },
  
    // Fonction pour analyser un comportement de conduite
    analyzeBehavior: function(speed, isDangerous) {
      if (speed > 80 && this.level >= 3) {
        console.log("Alerte : Vitesse excessive détectée !");
        if (this.level >= 6 && isDangerous) {
          console.log("Action : Envoi d'une alerte de prévention aux secours.");
          this.log.push("Alerte de sécurité envoyée pour conduite dangereuse.");
        } else {
          console.log("Action : Alerte de prévention envoyée au conducteur.");
          this.log.push("Alerte de prévention envoyée.");
        }
      } else {
        console.log("Comportement de conduite normal détecté.");
      }
    },
  
    // Fonction pour afficher le journal des actions
    showLog: function() {
      console.log("Journal des actions du radar AI :");
      this.log.forEach(entry => console.log(`- ${entry}`));
    }
  };
  
  // Exemple d'utilisation
  radarAI.levelUp(); // Le radar passe au niveau 2
  radarAI.levelUp(); // Le radar passe au niveau 3
  radarAI.analyzeBehavior(90, false); // Alerte de vitesse excessive
  radarAI.levelUp(); // Le radar passe au niveau 6
  radarAI.analyzeBehavior(100, true); // Alerte de prévention envoyée aux secours
  radarAI.showLog(); // Afficher le journal des actions
  