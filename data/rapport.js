const fs = require("fs");
const readline = require("readline");

// Interface pour capturer l'entrée de l'utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour générer un rapport
function generateReport(data) {
  const { title, date, participants, agenda, discussions, conclusions } = data;

  // Format du rapport
  const reportContent = `
# ${title}

**Date**: ${date}
**Participants**: ${participants.join(", ")}

---

## Ordre du Jour
${agenda.map((item, index) => `${index + 1}. ${item}`).join("\n")}

---

## Déroulement de la Séance

${discussions.map((discussion, index) => `### Point ${index + 1}: ${agenda[index]}\n${discussion}`).join("\n\n")}

---

## Conclusions et Recommandations
${conclusions}

---

**Signatures**:
- Président: ____________________
- Secrétaire: ____________________

`;

  // Écrire le rapport dans un fichier
  const fileName = `rapport_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
  fs.writeFileSync(fileName, reportContent.trim());
  console.log(`Le rapport a été enregistré sous ${fileName}`);
}

// Fonction principale pour collecter les détails du rapport
function collectReportDetails() {
  let data = {
    title: "",
    date: new Date().toLocaleDateString(),
    participants: [],
    agenda: [],
    discussions: [],
    conclusions: ""
  };

  rl.question("Titre du rapport: ", (title) => {
    data.title = title;

    rl.question("Participants (séparés par des virgules): ", (participants) => {
      data.participants = participants.split(",").map(p => p.trim());

      rl.question("Nombre de points à l'ordre du jour: ", (numPoints) => {
        let num = parseInt(numPoints);
        if (isNaN(num) || num <= 0) {
          console.error("Nombre invalide. Veuillez entrer un nombre valide.");
          rl.close();
          return;
        }

        // Collecte des points de l'ordre du jour
        function collectAgenda(index) {
          if (index < num) {
            rl.question(`Point ${index + 1}: `, (point) => {
              data.agenda.push(point);
              collectAgenda(index + 1);
            });
          } else {
            collectDiscussions(0);
          }
        }

        // Collecte des discussions pour chaque point
        function collectDiscussions(index) {
          if (index < num) {
            rl.question(`Discussion pour le point "${data.agenda[index]}": `, (discussion) => {
              data.discussions.push(discussion);
              collectDiscussions(index + 1);
            });
          } else {
            rl.question("Conclusions et recommandations: ", (conclusions) => {
              data.conclusions = conclusions;
              rl.close();
              generateReport(data);
            });
          }
        }

        collectAgenda(0);
      });
    });
  });
}

// Lancer la collecte de détails
collectReportDetails();
