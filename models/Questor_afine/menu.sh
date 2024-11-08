#!/bin/bash

# Menu Interactif pour AlgoGenesis

menu() {
  echo "✨ Menu Interactif AlgoGenesis ✨"
  echo "1. Générer le frontend"
  echo "2. Générer le backend"
  echo "3. Générer fullstack (Frontend + Backend)"
  echo "4. Afficher les algorithmes disponibles"
  echo "5. Mettre à jour le projet sur GitHub"
  echo "q. Quitter"

  read -p "Votre choix : " choice

  case $choice in
    1)
      make run-frontend
      ;;
    2)
      make run-backend
      ;;
    3)
      make generate-fullstack
      ;;
    4)
      make algorithms
      ;;
    5)
      make update
      ;;
    q)
      echo "✨ Au revoir ! ✨"
      exit 0
      ;;
    *)
      echo "Choix invalide, veuillez réessayer."
      ;;
  esac
}

menu