import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'hostname',
    message: 'Entrez le hostname pour le serveur:',
  },
  {
    type: 'list',
    name: 'environment',
    message: 'Choisissez l’environnement cible:',
    choices: ['development', 'staging', 'production'],
  },
  {
    type: 'list',
    name: 'algorithm',
    message: 'Choisissez un algorithme pour la génération :',
    choices: ['Frontend Generator', 'Backend Generator', 'Fullstack', 'API Rest'],
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(`
      Configuration:
      - Hostname: ${answers.hostname}
      - Environnement: ${answers.environment}
      - Algorithme: ${answers.algorithm}
    `);

    // Ici, en fonction des réponses, tu pourrais appeler les scripts liés
    if (answers.algorithm === 'Frontend Generator') {
      console.log('Lancement de la génération frontend...');
      // Lancer le script frontend
    } else if (answers.algorithm === 'Backend Generator') {
      console.log('Lancement de la génération backend...');
      // Lancer le script backend
    } else if (answers.algorithm === 'Fullstack') {
      console.log('Lancement de la génération Fullstack...');
      // Lancer le script fullstack
    }
  });
