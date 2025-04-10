# 🎜 MovieBooker - Backend API

> Projet réalisé en NestJS avec PostgreSQL, déployé sur Render.  
Permet à un utilisateur de créer, lister, et supprimer des réservations de films tout en assurant une authentification sécurisée via JWT.

---

## 🚀 Technologies utilisées

- [NestJS](https://nestjs.com/) – Framework Node.js modulaire
- [TypeORM](https://typeorm.io/) – ORM avec support PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) – Base de données relationnelle
- [Passport](http://www.passportjs.org/) – Authentification
- [JWT](https://jwt.io/) – JSON Web Tokens
- [Render](https://render.com/) – Hébergement du backend + BDD

---

## 📦 Installation locale

```bash
# 1. Cloner le projet
git clone https://github.com/DirtyTheRogue/MovieBooker.git
cd MovieBooker

# 2. Installer les dépendances
npm install

# 3. Créer un fichier .env à la racine du projet
touch .env
```

### Exemple de fichier `.env`

```
JWT_SECRET=tonSecretJWT
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=moviebooker
```

---

## 🏁 Lancer le projet

```bash
npm run start:dev
```

Swagger est accessible sur :  
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧪 Fonctionnalités

- ✅ Authentification via `/user/login` (JWT)
- ✅ Route protégée `/user/protected`
- ✅ CRUD complet sur les réservations :
  - `GET /reservations` – Lister toutes les réservations
  - `POST /reservations` – Créer une réservation
  - `DELETE /reservations/:id` – Supprimer une réservation
- ✅ Règles métier :
  - Pas de chevauchement entre 2 réservations
  - Délai minimum de 2h entre deux réservations

---

## 🌐 Déploiement Render

🔗 **URL publique (backend)** :  
https://moviebooker-rruz.onrender.com

📄 **Swagger (documentation)** :  
https://moviebooker-rruz.onrender.com/api

---

## 👤 Auteur

Charles M. – Étudiant EFREI (Master Dev Fullstack)  
Ce projet a été réalisé dans le cadre d’un exercice structuré en 4 jours.

---

