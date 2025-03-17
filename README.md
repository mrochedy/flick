# Flick - Application de prise de notes

Cette application permet la création, visualisation, modification et gestion de notes avec un historique de versions.

## Technologies utilisées

### Backend

- **Python** avec **FastAPI** : Choix d'un framework web moderne et performant
- **SQLite** : Base de données légère et ne nécessitant pas de configuration
- **SQLAlchemy** : ORM pour une interaction plus structurée avec la base de données
- **Uvicorn** : Serveur ASGI pour exécuter l'application FastAPI

### Frontend

- **React** avec **TypeScript** : Pour un développement fiable avec typage statique
- **React Query** : Gestion efficace des requêtes API et du cache côté client
- **Axios** : Client HTTP pour les appels API
- **CSS natif** : Pour un styling simple et épuré sans dépendances supplémentaires

## Architecture

### Backend

Architecture en couches pour une séparation claire des responsabilités :

- **API** : Points d'entrée REST
- **Services** : Logique métier
- **Repositories** : Accès aux données
- **Schemas** : Validation des données (Pydantic)
- **Models** : Définition des entités (SQLAlchemy)
- **Core** : Configuration et initialisation

### Frontend

- Organisation en composants réutilisables
- Modèles typés pour les structures de données
- Gestion des requêtes API avec React Query

## Comment lancer le projet

### Configuration du backend

1. Naviguez vers le dossier backend

```bash
cd backend
```

2. Créez un environnement virtuel Python

```bash
python -m venv venv
```

3. Activez l'environnement virtuel

```bash
# Sur Windows
venv\Scripts\activate
# Sur macOS/Linux
source venv/bin/activate
```

4. Installez les dépendances

```bash
pip install -r requirements.txt
```

5. Lancez le serveur

```bash
python run.py
```

Le backend sera accessible à l'adresse http://localhost:8000

### Configuration du frontend

1. Naviguez vers le dossier frontend

```bash
cd frontend
```

2. Installez les dépendances

```bash
npm install
```

3. Lancez l'application en mode développement

```bash
npm run dev
```

L'application frontend sera accessible à l'adresse http://localhost:5173

## Fonctionnalités

- **Création de notes** : Ajout de nouvelles notes avec titre et contenu
- **Visualisation** : Consultation des notes dans une interface épurée
- **Modification** : Édition directe du contenu des notes
- **Suppression** : Possibilité de supprimer les notes
- **Historique des versions** : Visualisation des modifications antérieures
- **Différentiel des modifications** : Visualisation des changements entre versions (similaire à git diff)
- **Restauration de versions** : Possibilité de revenir à une version précédente

## API Backend

- `GET /notes/` : Récupère toutes les notes
- `POST /notes/` : Crée une nouvelle note
- `GET /notes/{id}` : Récupère une note spécifique
- `PUT /notes/{id}` : Met à jour une note existante
- `DELETE /notes/{id}` : Supprime une note
- `GET /notes/{id}/history` : Récupère l'historique des versions d'une note

## Pistes d'amélioration

### Fonctionnalités additionnelles

- **Dictée vocale** : Intégration de reconnaissance vocale pour création de notes par commande vocale
- **Formatage avancé** : Support pour différents styles de texte, listes à puces, tableaux
- **Organisation par dossiers/tags** : Catégorisation des notes
- **Recherche textuelle** : Implémentation d'un moteur de recherche dans les notes

### Améliorations techniques

- **Tests unitaires et d'intégration** : Augmenter la couverture de tests
- **Optimisation des performances** : Mise en cache et chargement à la demande
- **Authentification** : Système de connexion utilisateur
- **Déploiement containerisé** : Configuration Docker pour un déploiement simplifié

## Choix de design

L'interface a été conçue pour être simple et intuitive, sans surcharge visuelle. L'accent a été mis sur l'expérience utilisateur avec un design épuré qui permet à l'utilisateur de se concentrer sur le contenu de ses notes.

La décision de ne pas utiliser de bibliothèques UI ou de gestion d'état complexes a été prise pour éviter d'ajouter une complexité inutile à un projet de cette envergure, tout en maintenant une base de code propre et maintenable.
