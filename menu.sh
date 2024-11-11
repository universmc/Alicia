#!/bin/bash

# Fonction pour générer un nombre aléatoire de 75 chiffres


#!/bin/bash
# Script de vérification de sécurité de l'adresse IP d'un radar

radar_ip="192.168.1.100"  # Exemple d'adresse IP

echo "Vérification de l'adresse IP : $radar_ip"

# Vérification de la connectivité
ping -c 3 $radar_ip > /dev/null
if [ $? -eq 0 ]; then
    echo "Connectivité à $radar_ip : OK"
else
    echo "Erreur : Impossible de joindre l'adresse IP"
fi

# Analyse des ports ouverts
echo "Analyse des ports ouverts sur $radar_ip"
nmap -p 1-65535 $radar_ip

# Vérification des tentatives d'accès non autorisées dans les logs
echo "Recherche de tentatives d'accès non autorisées..."
grep "unauthorized access" /var/log/radar_logs.log


# Affichage de l'heure et du mode de développement
echo "💻$(date "+%H:%M:%S") /dev mode"
titre() {  
    echo "                               ╔═══════════════════════════════════════════════════════════╗";
    echo "                               ║               _                                           ║";
    echo "                               ║   _   _ _ __ (_)_   _____ _ __ ___       _ __ ___   ___   ║";
    echo "                               ║  | | | | '_ \| \ \ / / _ \ '__/ __|_____| '_ ' _' \| __|  ║";
    echo "                               ║  | |_| | | | | |\ V /  __/ |  \__ \_____| | | | | | (__   ║";
    echo "                               ║   \__,_|_| |_|_| \_/ \___|_|  |___/     |_| |_| |_|\___|  ║";
    echo "                               ║                                                           ║";
    echo "                               ╚═══════════════════════════════════════════════════════════╝";
    echo ""; 

# Définition de la fonction 'menu' pour afficher le menu avec les options:

menu() {
    echo ""
    echo "   ╔════════════════════════════════════╗    ╔════════════════════════════════════════════════════════════════════════════════════╗";
    echo "   ╠───────────{ ✨ Android  }──────────╣    ║ [📗 📕 📒]                 🔷 Weclom to Galileo sat Line 🔷                [🔎] [💫] ║";
    echo "   ║                                    ║    ╠────────────────────────────────────────────────────────────────────────────────────╣";
    echo "   ║                      💠            ║    ║                                                                                    ║";
    echo "   ║             ╲┈┈┈┈╱                 ║    ║                                                                                    ║";      
    echo "   ║             ╱▔▔▔▔╲                 ║    ║                                                                                    ║";
    echo "   ║            ┃┈▇┈┈▇┈┃                ║    ║                                                                                    ║";
    echo "   ║          ╭╮┣━━━━━━┫╭╮              ║    ║                                                                                    ║";
    echo "   ║          ┃┃┃┈┈┈┈┈┈┃┃┃              ║    ║                                                                                    ║";
    echo "   ║          ╰╯┃┈┈┈┈┈┈┃╰╯              ║    ║                                                                                    ║";
    echo "   ║            ╰┓┏━━┓┏╯                ║    ║                                                                                    ║";
    echo "   ║             ╰╯  ╰╯                 ║    ║                                                                                    ║";
    echo "   ║    ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈     ║    ║                                                                                    ║";
    echo "   ║                                    ║    ║                                                                                    ║";
    echo "   ║ [>] Menu                           ║    ║                                                                                    ║";
    echo "   ║                                    ║    ║                                                                                    ║";
    echo "   ║        [x] Call                    ║    ║                                                                                    ║";
    echo "   ║        [ ] Generative AI           ║    ║                                                                                    ║";
    echo "   ║        [ ] MyPrompt                ║    ║                                                                                    ║";
    echo "   ║                                    ║    ║                                                                                    ║";
    echo "   ║        [ ] call                    ║    ║                                                                                    ║";
    echo "   ║        [ ] Telegram                ║    ║                                                                                    ║";
    echo "   ║        [ ] Youtube                 ║    ║                                                                                    ║";
    echo "   ║                                    ║    ║                                                                                    ║";
    echo "   ║        [X] Map                     ║    ║                                                                                    ║";
    echo "   ║        🔒 Signal                   ║    ║                                                                                    ║";
    echo "   ║                                    ║    ║                                                                                    ║";
    echo "   ║                                    ║    ║                                                                                    ║";
    echo "   ╠════════════════════════════════════╣    ╠════════════════════════════════════════════════════════════════════════════════════╣";
    echo "   ║ [📱] [📷] [🎹] [🤖] [🗂️] [📊] [💰]  ║    ║ 📡 :<                                                                            🛰 ║";
    echo "   ╚════════════════════════════════════╝    ╚════════════════════════════════════════════════════════════════════════════════════╝"; 
    echo ""

read -p "Entrez votre choix : " commande

case $commande in

        Tme)
            make Tme
            ;;
        call)
            make call
            ;;
        map)
            make map
            ;;
        update)
            make update
            ;;
        1)
            make commande1
            ;;
        2)
            make commande2
            ;;
        3)
            make commande3
            ;;
        chat)
            make chat
            ;;
        5)
            make commande5
            ;;

        6)
            make commande6
            ;;
        7)
            make commande7
            ;;
        8)
            make commande8
            ;;
        9)
            make commande9
            ;;
        10)
            make commande10
            ;;
        a)
            make commandeA
            ;;
        g)
        make commandeg
            ;;
        r)
            clear
            menu
            ;;

        # Règle par défaut en cas d'entrée invalide
        *)
            echo "Entrée invalide"
            ;;
    esac
}
}
titre
menu  # Appel de la fonction pour afficher le menu: