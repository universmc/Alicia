import inquirer from 'inquirer';
import fs from 'fs';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  // Définir les questions avec choix multiples
  const questions = [
    {
      type: 'input',
      name: 'hostname',
      message: 'Entrez le nom de l’hôte de votre serveur:',
    },
    {
      type: 'list',
      name: 'questionType',
      message: 'Quelle est la meilleure façon de procéder pour trouver la vérité ?',
      choices: ['Option 1: Analyse de données', 'Option 2: IA et prédiction', 'Option 3: Études théoriques', 'Option 4: Simulation'],
    },
  ];

  // Poser les questions avec inquirer
  const answers = await inquirer.prompt(questions);

  // Envoyer la réponse au modèle Groq
  await generateChatCompletion(answers);
}

// Fonction pour générer une complétion via Groq en utilisant le modèle de réponse
async function generateChatCompletion(answers) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Lorsque l’utilisateur saisit une commande, vous lui posez une question à choix multiple et proposez plusieurs réponses possibles.',
        },
        {
          role: 'user',
          content: `Hostname: ${answers.hostname} | Choix: ${answers.questionType}`,
        },
        {
          role: 'assistant',
          content: `Vous avez sélectionné: ${answers.questionType}. Je vais vous aider à comprendre les conséquences possibles de ce choix.`,
        },
      ],
      model: 'gemma2-9b-it',
      temperature: 0.7,
      max_tokens: 4096,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || 'Pas de réponse générée';
    
    // Sauvegarder le résultat dans un fichier Markdown
    const outputFilePath = `PromptResult_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
    fs.writeFileSync(outputFilePath, responseContent);
    console.log(`Complétion générée et enregistrée dans ${outputFilePath}`);
  } catch (error) {
    console.error("Erreur lors de la génération de la complétion:", error.message);
  }
}

main();
