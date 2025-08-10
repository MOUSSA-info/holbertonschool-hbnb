# 📌 HBNB – Part 4 : Web Client

## 📖 Présentation
Cette partie 4 du projet **HBNB** consiste à développer l’interface **front-end** de l’application, en **HTML5**, **CSS3** et **JavaScript (ES6)**, afin de consommer les APIs du back-end Flask mises en place précédemment (parties 1 à 3).

L’objectif est de proposer une application web dynamique, responsive, moderne, avec authentification par **JWT** et interaction en temps réel avec l’API.

---

## 🎯 Objectifs

- Développer une interface utilisateur complète et ergonomique.
- Afficher la liste des lieux disponibles avec possibilité de filtrage.
- Afficher le détail de chaque lieu et ses avis.
- Permettre à un utilisateur connecté d’ajouter un avis.
- Gérer l’authentification et la session via **JSON Web Token** stocké en cookie.
- Garantir la compatibilité **mobile / desktop**.

---

## 📂 Structure du projet (Part 4)


---

## 📜 Fonctionnalités par page

### 1️⃣ **Login (login.html + auth.js)**
- Formulaire de connexion (`email`, `mot de passe`)
- Envoi des données en POST à `/api/login`
- Stockage du JWT en cookie (`token`)
- Redirection vers `index.html` en cas de succès
- Message d’erreur en cas d’échec

### 2️⃣ **Index (index.html + index.js)**
- Affichage de la liste dynamique des lieux (`GET /api/places`)
- Affichage conditionnel du lien **Connexion** (si non authentifié)
- Filtres client par **prix maximum** et éventuellement **pays**
- Responsive grid avec cartes (`place-card`)

### 3️⃣ **Place Details (place.html + place_detail.js)**
- Lecture de l’ID du lieu depuis l’URL (`?id=123`)
- Récupération des détails via `GET /api/places/<id>`
- Affichage : nom, description, prix, hôte, commodités
- Liste des avis actuels (`review-card`)
- Formulaire d’ajout d’avis visible uniquement si connecté

### 4️⃣ **Add Review (add_review.html + add_review.js)**
- Chargement uniquement si authentifié (sinon redirection index)
- Envoi en POST vers `/api/places/<id>/reviews`
- Message de succès / erreur
- Réinitialisation du formulaire après envoi

---

## ⚙️ Installation & Lancement

### 1. **Prérequis**
- **Backend Flask** de HBNB prêt et lancé (`localhost:5000`)
- **Python 3** installé (pour serveur local côté front)
- Navigateur moderne supportant ES6 et Fetch API

### 2. **Cloner le projet**

Pour accéder à une page précise :  
- **login** : `http://localhost:8000/login.html`  
- **liste** : `http://localhost:8000/index.html`  
- **détails** : `http://localhost:8000/place.html?id=1`  
- **ajout avis** : `http://localhost:8000/add_review.html?id=1`

---

## 🖥️ Interaction avec le Back-end

Toutes les requêtes sont effectuées vers l’API REST Flask :
- Login : `POST /api/login`
- Liste des lieux : `GET /api/places`
- Détails d’un lieu : `GET /api/places/<id>`
- Ajouter un avis : `POST /api/places/<id>/reviews`

**Authentification :**
- Token JWT stocké en cookie (`token`).
- Inclus dans l’en-tête `Authorization: Bearer <token>` pour les requêtes protégées.

---

## 🎨 Design & Responsive

- CSS modulaire : **Variables, Components, Layout, Animations, Themes, Utilities, Responsive**
- Fonts Google : `Inter`
- Grid responsive pour la liste des lieux
- Dark mode via `themes.css` + bouton toggle
- Animations CSS modernes (hover, apparition au scroll)

---

## 🧪 Tests à effectuer

1. **Connexion**  
   - Avec identifiants valides → redirection + cookie token
   - Avec mauvais identifiants → affichage erreur

2. **Liste des lieux**  
   - Affichage uniquement si token valide
   - Test des filtres par prix

3. **Page détail**  
   - Vérifier affichage complet des informations
   - Avis affichés correctement
   - Formulaire visible uniquement si connecté

4. **Ajout d’avis**  
   - Vérifier redirection si non connecté
   - Test envoi message + affichage succès/erreur

---

## 📌 Notes importantes

- **Sécurité CORS** : le back-end doit autoriser les requêtes depuis `http://localhost:8000`
- **Noms de fichiers & chemins** : respecter la structure indiquée
- **Validation HTML** : toutes les pages doivent passer la validation W3C
- **Accessibilité** : labels associés aux champs de formulaire, texte alternatif pour les images, bonne hiérarchie de titres

---

## 📄 Licence
Ce projet est réalisé dans le cadre du programme Holberton School.  
Toute réutilisation doit respecter la licence du dépôt principal.

##AUTHOR 
MOUSSA_HOLBIE
