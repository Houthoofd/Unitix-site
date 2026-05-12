# Unitix - Testing Platform 🚀

Bienvenue sur le dépôt **Unitix** ! 
Unitix est une plateforme front-end premium conçue pour simplifier la génération, l'analyse et le suivi de tests automatisés pour des projets de développement logiciel.

## 🌟 Aperçu

L'application est construite comme une **Single Page Application (SPA)** hautement réactive, sans aucun framework externe lourd (ni React, ni Vue). Tout a été développé en **Vanilla JavaScript**, **HTML5** et **CSS3** pour une performance maximale et une maîtrise totale de l'interface.

### Fonctionnalités Clés
- **Expérience d'Onboarding** : Simulation d'importation de projet via Drag & Drop et Tutoriel interactif guidé pour les nouveaux utilisateurs.
- **Tableau de Bord Dynamique** : Visualisation instantanée de la couverture de test estimée et du nombre de cas générés.
- **Espace Multi-Projets** : Sélecteur intégré dans le Header pour basculer facilement entre différents environnements de travail.
- **Générateur Intelligent (Simulé)** : Une interface à trois panneaux (Code Source, Configuration, Résultats) pensée pour interagir avec une future IA.
- **Architecture & Historique** : Navigation au sein de l'arborescence du projet et suivi de toutes les actions récentes.
- **Design "Dark Neon"** : Une interface sombre (Dark Mode) avec des effets visuels (Glow, Glassmorphism) pour une expérience haut de gamme.

## 🛠 Technologies Utilisées
- **HTML5** : Structure sémantique modulaire.
- **CSS3** : Variables CSS (`var(--neon-cyan)`), Grid/Flexbox, Animations natives, CSS Modules.
- **Vanilla JS** : Routeur SPA personnalisé, gestion de l'état (Local Storage), ES6 Modules.

## 🚀 Installation & Utilisation

L'application ne nécessitant pas de processus de compilation (build process), le lancement est extrêmement simple :

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/Houthoofd/Unitix-site.git
   ```
2. Ouvrez le dossier dans votre éditeur de code préféré (ex: VS Code).
3. Lancez le fichier `index.html` ou `login.html` directement dans votre navigateur.
   - *Note : Il est recommandé d'utiliser une extension comme "Live Server" pour éviter les restrictions de sécurité liées aux modules JS locaux (`import/export`).*

## 📁 Structure du Projet

```text
Unitix-site/
├── assets/                  # Images et icônes
├── css/
│   ├── components/          # Styles modulaires (header, sidebar, etc.)
│   ├── pages/               # Styles spécifiques aux vues (dashboard, login, etc.)
│   ├── animations.css       # Déclaration des keyframes
│   ├── base.css             # Styles de base (reset, typo)
│   └── variables.css        # Design System (Couleurs, Typographie)
├── js/
│   ├── mock/                # Données factices pour la simulation
│   ├── ui/                  # Logique de l'interface (Router, Tutoriel, etc.)
│   └── main.js              # Point d'entrée principal
├── index.html               # L'Espace Personnel (SPA)
└── login.html               # Page d'authentification
```

## 🤝 Contribution
Ce projet est un prototype front-end. Si vous souhaitez l'étendre (par exemple, en le connectant à un backend Node.js ou à une API Python d'intelligence artificielle), n'hésitez pas à forker le dépôt et à soumettre des Pull Requests.

---
*Conçu et développé par Benoit Houthoofd.*
