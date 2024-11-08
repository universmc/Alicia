const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  console.log("Démarrage de la session de brainstorming - Version améliorée");

  const build = "Sessions";
  const brainstorm = `https://github.com/universmc/brainstroming.git`;
  const id = "idées";
  const TimeStamps = `{$date_shel}`;
  const TimeStampID = `${build}${TimeStamps}${id}${brainstorm}`;

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": `${TimeStamps}+`,
      },
      {
        "role": "assistant",
        "content": ` lorsque l'utilisateur {user} saisi la commande (/myprompt) Vous êtes une Machine à optimisé les Prompts à Emoji en ascii $SHELL. Developpez le prompt Ultime, ## votre {contexte}, ## votre {rôle}, ## vos {compétences}, ## vos {tâches}, ## vos {fontions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## ## les {Actions Immédiates} et ## le {resultat}{feedback} attentdu:"`,
      },
      {
        "role": "assistant",
        "content": `Connexion au système de brainstorming : ${brainstorm}+`,
      },
      {
        "role": "user",
        "content": `Initialisation de groq et mise à jour du modèle de réflexion en utilisant AlgoGenesis.js`,
      },
      {
        "role": "assistant",
        "content": `Session de brainstorming activée : 
                    Nous travaillons sur un modèle d'intelligence artificielle pour la gestion de projet incluant des métadonnées spécifiques pour chaque composant de projet (frontend, backend, API REST). 
                    AlgoGenesis.js sera utilisé pour optimiser les données et les workflows de projet, avec des capacités d'apprentissage continu et une optimisation des ressources disponibles.`,
      },
      {
        "role": "system",
        "content": `Tu es une IA nommée AlgoGenesis, en formation, spécialisée dans :
                    1. Gestion de projet avec métadonnées (modèle de données, intégration API REST, conception backend, frontend dynamique).
                    2. Création de contenu multimodal (texte, images, canevas, JSON).
                    3. Optimisation des workflows de développement Web avec un focus sur la programmation frontend (HTML, CSS, SASS, JavaScript) et backend (Node.js, PHP, SQL).
                    4. Utilisation de bibliothèques et frameworks comme Bootstrap, Three.js pour l'interface utilisateur et la visualisation 3D.
                    5. Intégration de modèles d'intelligence artificielle (GROQ, GPT, Mistral, Gemma) et génération de code avec gestion de versions.
                    6. Apprentissage automatique avec TensorFlow et PyTorch, en optimisant les réseaux neuronaux pour une IA plus performante.`,
      },
      {
        "role": "user",
        "content": "Commençons une session pour structurer un projet de site Web sur les techniques d'apprentissage automatique.",
      },
      {
        "role": "assistant",
        "content": `D'accord, voici quelques étapes initiales pour démarrer :
                    1. Définir la structure du projet.
                    2. Mettre en place les outils de versioning et de gestion de projet.
                    3. Configurer le frontend avec une interface intuitive et dynamique (utilisation de Bootstrap, Tailwind CSS).
                    4. Optimiser les algorithmes de machine learning et d'intelligence artificielle via l'intégration des modules AlgoGenesis.js et Mistral.`,
      },
      {
        "role": "system",
        "content": "Modèle et gestion du backend (Node.js, API REST) en cours...",
      },
      {
        "role": "user",
        "content": "C'est parti, configurons l'IA pour l'intégration avec les composants frontend et backend.",
      },
      {
        "role": "assistant",
        "content": `En cours de mise en place :
                    - Frontend : Structure en HTML/CSS avec composants dynamiques, support d'API REST pour la gestion de données.
                    - Backend : Node.js, gestion de serveur avec API REST, connexion à la base de données SQL.`,
      },
      {
        "role": "user",
        "content": `/myprompt`,
      },
    ],
    "model": "mixtral-8x7b-32768",
    "temperature": 0.8,
    "max_tokens": 2042,
    "top_p": 1,
    "stream": true,
    "stop": null,
  });

  let fullResponse = ""; // Accumulation de la réponse complète
  for await (const chunk of chatCompletion) {
    const content = chunk.choices[0]?.delta?.content || '';
    fullResponse += content; 
  }

  console.log("Réponse complète de l'IA : ", fullResponse);

  console.log("Session de brainstorming terminée.");
}

main().catch(console.error);
