# Kasa — Plateforme de location immobilière

Projet 8 de la formation Développeur Web OpenClassrooms : une application fullstack de location immobilière.

- **Frontend** : Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend** : Express 5, SQLite, JWT
- **Tests** : Vitest, Testing Library, Storybook

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd Projet-8
```

### Backend

```bash
cd backend
npm install
cp .env.example .env     # puis modifier JWT_SECRET
npm start                 # démarre sur http://localhost:3000
```

Variables d'environnement (`.env`) :

| Variable       | Description                          | Défaut              |
|----------------|--------------------------------------|---------------------|
| `PORT`         | Port du serveur                      | `3000`              |
| `JWT_SECRET`   | Secret pour signer les tokens JWT    | (à définir)         |
| `JWT_EXPIRES_IN` | Durée de validité des tokens       | `7d`                |

La base SQLite (`data/kasa.sqlite3`) est créée automatiquement au premier lancement avec des données de démonstration.

Documentation API interactive : http://localhost:3000/docs.html

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # vérifier NEXT_PUBLIC_API_BASE_URL
npm run dev                   # démarre sur http://localhost:3001
```

Variables d'environnement (`.env.local`) :

| Variable                    | Description             | Défaut                   |
|-----------------------------|-------------------------|--------------------------|
| `NEXT_PUBLIC_API_BASE_URL`  | URL de l'API backend    | `http://localhost:3000`  |

## Scripts utiles (frontend)

| Commande                  | Description                           |
|---------------------------|---------------------------------------|
| `npm run dev`             | Serveur de développement (port 3001)  |
| `npm run build`           | Build de production                   |
| `npm start`               | Serveur de production                 |
| `npm test`                | Lancer les tests unitaires            |
| `npm run test:watch`      | Tests en mode watch                   |
| `npm run storybook`       | Storybook (port 6006)                 |
| `npm run build-storybook` | Build statique de Storybook           |
| `npm run lint`            | Linter ESLint                         |

## Structure du projet

```
├── backend/          # API REST Express + SQLite
│   ├── controllers/  # Logique des routes
│   ├── services/     # Accès aux données
│   ├── middlewares/   # Auth JWT, vérification DB
│   ├── routes/        # Définition des routes
│   └── data/          # Base SQLite + seed JSON
│
├── frontend/         # Application Next.js
│   └── src/
│       ├── app/         # Routes (App Router)
│       ├── components/  # Composants UI
│       ├── contexts/    # Contextes React (auth, favoris)
│       ├── api/         # Fonctions d'appel API
│       ├── hooks/       # Hooks personnalisés
│       ├── types/       # Interfaces TypeScript
│       └── lib/         # Utilitaires
```
