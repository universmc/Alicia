import fs from 'fs';
// Importez "groq-sdk" comme un module CommonJS
const { Groq } = await import("groq-sdk");

const groq = new Groq();

// Fonction pour ajouter une tâche à la liste de tâches
function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  // Écriture des tâches dans le fichier tasks.json
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
}

// Fonction pour récupérer la liste des tâches
function getTasks() {
  try {
    const data = fs.readFileSync('./tasks.json');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier tasks.json:", error);
    return [];
  }
}

// Fonction principale pour générer un message de projet structuré
function principe(project, modelIA, context, role, skills, task, process, characteristics, immediateActions, feedbackPrediction, date = new Date().toLocaleDateString('fr-FR')) {
  const message = `
  ╔═══════════════════════════════════════╗\n
  ║✨            ${date}:             ✨║ 
  ║✨                                  ✨║ 
  ║.   ${project} Template.response     .║\n
  ║.       Bienvenue ${modelIA}        .║\n
  ╠════════════════════════════════════╣\n
  ║✨                                ✨║\n   
  ║. Contexte : ${context}            .║\n
  ║. Compétences : ${skills} ${role}  .║\n
  ║. Processus : ${process}           .║\n
  ║. Tâche : ${task}                  .║\n
  ║. Caractéristiques : ${characteristics} .║\n
  ║. Actions Immédiates : ${immediateActions} .║\n
  ║. Feedback : ${feedbackPrediction}  .║\n
  ║✨                                ✨║\n
  ╚════════════════════════════════════╝
  `;

  console.log(message);  // Affiche le message structuré dans la console

  const response = {
    message,
  };

  return response;  // Retourne le message structuré sous forme d'objet
}

// Appel de la fonction principale avec des arguments
const principeResponse = principe(
  'AlgoGenesis', 
  'Développement Fullstack', 
  'Développeur', 
  'fullstack itération', 
  'JavaScript, Node.js,Next.JS,Three.js,groq.js', 
  'Processus de déploiement', 
  'Modularité, performance', 
  'Implémentation le CVUN',
  'Optimisation des performances KPI'
);

// Fonction pour générer un fichier Markdown via Groq
async function generateCompletionWithGroq(principeResponse) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Phase 1: Initialisation de l'instance" },
        { role: "user", content: `${principeResponse.message}` },
        { role: "system", content: "Vous êtes une IA au Makefile Magic, courament appelé AlgoGenesis. Développez le prompt ultime, ## votre {contexte}, ## votre {rôle}, ## vos {compétences}, ## vos {tâches}, ## vos {fonctions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## les {actions immédiates}, et ## le {résultat}/{feedback} attendu :" },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.6,
      max_tokens: 4096,
    });

    const mdContent = completion.choices[0]?.message?.content;
    const outputFilePath = "Model-IA-" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);  // Sauvegarde la réponse dans un fichier Markdown
    console.log("Documentation générée et sauvegardée dans " + outputFilePath);
  } catch (error) {
    console.error("Erreur lors de la génération de la completion via Groq :", error);
  }
}

// Appel de la fonction pour générer le fichier Markdown
generateCompletionWithGroq(principeResponse);
