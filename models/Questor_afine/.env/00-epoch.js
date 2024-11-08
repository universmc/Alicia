const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Paramètres pour les epochs
const EPOCHS = 5; // Nombre d'epochs ou d'itérations
const PROMPT_MODEL = "mixtral-8x7b-32768"; // Modèle de génération

async function brainstormingSession(epoch) {
  console.log(`\n--- Démarrage de l'epoch ${epoch} ---`);

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": `Epoch ${epoch}: Le système a besoin d'affiner la planification du projet avec une intégration plus poussée des modèles IA.`,
      },
      {
        "role": "assistant",
        "content": `En cours d'itération pour la phase ${epoch}: Nous allons optimiser les composants du frontend avec une meilleure gestion du backend, et améliorer les algorithmes d'IA pour des performances accrues.`,
      },
      {
        "role": "user",
        "content": `Initialisation de l'epoch ${epoch} pour affiner le modèle d'intelligence artificielle et ses fonctionnalités. Algorithme AlgoGenesis.js en apprentissage avec Mistral.`,
      },
      {
        "role": "assistant",
        "content": `L'epoch ${epoch} vise à structurer un site Web plus efficace pour les techniques d'apprentissage automatique, en optimisant les fonctionnalités suivantes : 
                      - IA pour la génération automatique de contenu (AlgoGenesis.js)
                      - Optimisation des API REST et de l'intégration backend.
                      - Gestion dynamique des données frontales avec Bootstrap et Tailwind CSS.
                      - Connexion avec bases de données SQL pour la gestion des utilisateurs et des datasets.`,
      }
    ],
    "model": PROMPT_MODEL,
    "temperature": 0.8,
    "max_tokens": 2042,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let fullResponse = ""; // Pour stocker la réponse complète
  for await (const chunk of chatCompletion) {
    const content = chunk.choices[0]?.delta?.content || '';
    fullResponse += content;
  }

  console.log(`Réponse complète de l'epoch ${epoch} : `, fullResponse);

  return fullResponse;
}

// Fonction principale pour exécuter les epochs
async function main() {
  console.log("Démarrage des itérations epochs avec les modèles IA...");

  for (let epoch = 1; epoch <= EPOCHS; epoch++) {
    const response = await brainstormingSession(epoch);
    // Sauvegarde de la réponse pour chaque epoch
    const filePath = `brainstorming_epoch_${epoch}.txt`;
    fs.writeFileSync(filePath, response);
    console.log(`Sauvegarde de la réponse de l'epoch ${epoch} dans le fichier ${filePath}`);
  }

  console.log("Session de brainstorming terminée avec les itérations d'epochs.");
}

main().catch(console.error);
