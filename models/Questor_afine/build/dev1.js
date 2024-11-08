import inquirer from 'inquirer';
import fs from 'fs';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Définir les intentions dans un fichier JSON (exemple : intent.json)
const intents = JSON.parse(fs.readFileSync('intent.json', 'utf8'));

// Liste des questions pour la génération du site web (Frontend, Backend, API REST)
const questions = [
  {
    type: 'list',
    name: 'section',
    message: 'Quelle section souhaitez-vous générer ?',
    choices: ['Frontend', 'Backend', 'API REST'],
  },
  {
    type: 'list',
    name: 'technology',
    message: 'Quel framework ou technologie souhaitez-vous utiliser pour le Frontend ?',
    choices: ['React', 'Vue.js', 'Angular', 'HTML/CSS Vanilla'],
    when: (answers) => answers.section === 'Frontend',
  },
  {
    type: 'list',
    name: 'language',
    message: 'Quel langage de backend souhaitez-vous utiliser ?',
    choices: ['Node.js', 'PHP', 'Python', 'Ruby'],
    when: (answers) => answers.section === 'Backend',
  },
  {
    type: 'list',
    name: 'database',
    message: 'Quelle base de données souhaitez-vous utiliser ?',
    choices: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
    when: (answers) => answers.section === 'Backend',
  },
  {
    type: 'list',
    name: 'apiType',
    message: 'Quel type d\'API REST souhaitez-vous générer ?',
    choices: ['Express.js', 'Django', 'Flask', 'Spring Boot'],
    when: (answers) => answers.section === 'API REST',
  }
];

// Fonction principale pour démarrer l'interaction avec inquirer
inquirer.prompt(questions).then(async (answers) => {
  console.log(`
    Configuration choisie :
    - Section : ${answers.section}
    - Technologie/Framework : ${answers.technology || answers.language || answers.apiType}
    - Base de données : ${answers.database || 'N/A'}
  `);

  // Appel à groq-sdk pour générer des complétions en fonction des réponses de l'utilisateur
  await generateSiteCompletion(answers);
});

// Fonction pour générer une complétion avec Groq et générer des sections de site
async function generateSiteCompletion(answers) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        // Prompt initial du rôle system pour introduire la configuration choisie
        { role: 'system', content: intents.system[answers.section] },  // Charger le contenu du fichier intent.json
        { role: 'assistant', content: intents.assistant[answers.section] }, // Charger les réponses prédéfinies pour l'assistant
        { role: 'user', content: `L'utilisateur a choisi la section ${answers.section} avec la technologie ${answers.technology || answers.language || answers.apiType}.` }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2048
    });

    const completionText = chatCompletion.choices[0]?.message?.content || 'Pas de réponse générée';
    console.log("Complétion générée par Groq:", completionText);

    // Sauvegarder la complétion dans un fichier Markdown
    const outputFilePath = `output/generation_${answers.section}.md`;
    fs.writeFileSync(outputFilePath, completionText);
    console.log(`Documentation de génération sauvegardée dans ${outputFilePath}`);

  } catch (error) {
    console.error("Erreur lors de la génération de la complétion:", error.message);
  }
}
