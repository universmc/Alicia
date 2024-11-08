# Exemple simplifié des tâches courantes
SHELL := /bin/bash

COMMANDE1_MSG="✨ Lancement de l'application✨"
COMMANDE2_MSG="✨ Initialisation de la session de Brainstorming✨ "
COMMANDE3_MSG="✨ brainstorming generation d'idées ✨"
COMMANDE9_MSG="✨ Mise à jour du repository GitHub✨"

# Commandes pour la gestion des processus

all: menu

.PHONY: runPrompt

# Commande pour lancer le prompt interactif
runPrompt:
	@echo "Lancement de la base de Prompt Model"
	@node promptModel.js

menu:
	@echo "✨ Menu IA ✨"
	@echo "1. Lancer l'application"
	@echo "2. Initialiser une session de brainstorming"
	@echo "3. Générer des idées"
	@echo "9. Mettre à jour sur GitHub"
	@read -p "Choisissez une option : " opt; \
	case $$opt in \
		1) make run ;; \
		2) make brainstorming ;; \
		3) make generate ;; \
		9) make update ;; \
		*) echo "Option non valide" ;; \
	esac

run:
	@echo "${COMMANDE1_MSG}"
	@./menu.sh

brainstorming:
	@echo "${COMMANDE2_MSG}"
	@node .setup/brainstorming.js

generate:
	@echo "${COMMANDE3_MSG}"
	@node .setup/generate.js

update:
	@echo "${COMMANDE9_MSG}"
	@git add .
	@git commit -m "Mise à jour automatique"
	@git push
