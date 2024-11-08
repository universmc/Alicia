import inquirer from 'inquirer';
import fs from 'fs';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Charger le fichier intent.json
const intents = JSON.parse(fs.readFileSync('intent.json', 'utf8'));

// Définir les questions avec inquirer
const questions = [
  {
    type: 'input',
    name: 'hostname',
    message: intents.hostname_intent.system.content,  // Utiliser le prompt du role system depuis intent.json
  },
  {
    type: 'list',
    name: 'environment',
    message: intents.environment_intent.system.content,
    choices: ['development', 'staging', 'production'],
  },
  {
    type: 'list',
    name: 'algorithm',
    message: intents.algorithm_intent.system.content,
    choices: ['Frontend Generator', 'Backend Generator', 'Fullstack', 'API Rest'],
  }
];

// Fonction principale pour démarrer l’interaction et générer les complétions
inquirer.prompt(questions).then(async (answers) => {
  console.log(`
    Configuration:
    - Hostname: ${answers.hostname}
    - Environnement: ${answers.environment}
    - Algorithme: ${answers.algorithm}
  `);

  // Appeler la fonction pour générer la complétion à partir du prompt de l'utilisateur
  await generateChatCompletion(answers);
});

// Fonction pour générer une complétion avec Groq
async function generateChatCompletion(answers) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        // Prompt initial du role system
        { role: 'system', content: intents.hostname_intent.system.content },
        { role: 'assistant', content: intents.hostname_intent.assistant.content },
        // Envoyer la réponse utilisateur comme un message utilisateur
        { role: 'user', content: `Hostname: ${answers.hostname}` },

        // Prompt suivant : Environnement
        { role: 'system', content: intents.environment_intent.system.content },
        { role: 'assistant', content: intents.environment_intent.assistant.content.replace("{environment}", answers.environment) },
        { role: 'user', content: `Environnement sélectionné: ${answers.environment}` },

        // Prompt suivant : Algorithme
        { role: 'system', content: intents.algorithm_intent.system.content },
        { role: 'assistant', content: intents.algorithm_intent.assistant.content.replace("{algorithm}", answers.algorithm) },
        { role: 'user', content: `Algorithme choisi: ${answers.algorithm}` }
      ],
      model: 'mixtral-8x7b-32768',  // Modèle Groq pour générer des complétions
      temperature: 0.7,
      max_tokens: 1024
    });

    const completionText = chatCompletion.choices[0]?.message?.content || 'Pas de réponse générée';
    console.log("Complétion générée par Groq:", completionText);

  } catch (error) {
    console.error("Erreur lors de la génération de la complétion:", error.message);
  }
}
