# Titre de projet: PixelQuest

## Contexte du projet
L’objectif de  ce projet  est de permettre aux utilisateurs de **parcourir un catalogue de jeux vidéo,  
de filtrer selon leurs préférences** (genre, plateforme, popularité) et de sauvegarder leurs jeux favoris.

---

## Fonctionnalités du projet

###  1. Exploration des Jeux (API RAWG.io)
- Utilisation de `fetch()` pour récupérer dynamiquement la liste des jeux via l’API publique **RAWG.io**.
- Affichage des informations principales :
  - Nom du jeu  
  -  Jaquette  
  -  Genre  
  -  Note  
  -  Date de sortie  
  - Plateforme principale  

---

### 2. Recherche et Filtres dynamiques
- Champ de recherche par **nom de jeu**.  
- Filtres disponibles :
  - Par **genre** (Action, RPG, Simulation, etc.)  
  - Par **plateforme** (PC, PlayStation, Xbox, Switch…)  
  - Par **note** (croissante / décroissante)  
- Le filtrage s’effectue **sans rechargement de la page**.

---

###  3. Système de Favoris (localStorage)
- Possibilité d’ajouter ou de retirer un jeu des favoris via un bouton ❤️.  
- Persistance des favoris grâce au **localStorage**.  
- Une page ou une section “**Mes Favoris**” affiche les jeux sauvegardés.

---

###  4. Détails du Jeu (Modal ou Page dédiée)
Lorsqu’on clique sur un jeu :
- Affichage des informations détaillées :
  - Titre  
  - Description  
  - Éditeur / Studio  
  - Date de sortie  
  - Note et genres  
- Bouton **“Ajouter aux favoris”**

---

###  5. Gestion des données asynchrones
- Utilisation de **`async/await`** et **`try...catch`** pour la gestion des requêtes.  
- Gestion des cas d’erreur :
  - Absence de connexion internet  
  - Résultats vides  
- Affichage d’un **loader** ou d’un **message d’attente** pendant le chargement.

---

###  6. Interface Utilisateur (UI/UX)
- Conception d’une **maquette sous Figma** :
  - Wireframe + maquette finale  
- Utilisation obligatoire de **Tailwind CSS**  
- Design **responsive** (mobile, tablette, desktop)

---

## Organisation du Projet

###  Structure Git & GitHub
- Création d’un **Scrum Board** (To Do / In Progress / Done) sur **GitHub Projects**  
- Rédaction de **User Stories** avec critères d’acceptation  
- Workflow Git :
  - Branches : "main", "develop" 
  - **Pull Requests**, revues de code et merges validés sur "develop" et "main"

---

## Technologies utilisées
- HTML
- Tailwind CSS
- JavaScript (DOM)
- API 
- localStorage
- Git & GitHub

---

##Auteur
nom/prenom: zahir kaoutar
gmail:zahirkaoutar2003@gmail.com
github:https://github.com/ZahirKaoutar/PixelQuest

---



