# Survey app

## Description

Survey app  est une application JavaScript simple permettant de gérer les fiches d'enquête de satisfaction des clients. L'application utilise une base de données MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces fiches.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**


    git clone https://github.com/OusmaneLyDev/Survey-app.git
```

2. **Accédez au dossier du projet :**

   
    cd app_survey

    ```

3. **Installez les dépendances :**


    npm install
    ```

4. **Structure du Projet :**

    src/
        index.js: Fichier principal contenant le code de l'application.
        src2/
            db.js: Fichier de configuration pour la connexion à la base de données MongoDB.

5.  **Modules et Fonctions**


question.js

    Description: Ce module gère toutes les opérations liées aux questions, y compris la création, la lecture, la mise à jour et la suppression.
    Structure des Données:
        id: ObjectId, identifiant unique pour chaque question.
        questionText: String, le texte de la question.
        category: String, la catégorie de la question.
        createdAt: Date, la date de création de la question.
    Fonctions principales:
        createQuestion(question): Crée une nouvelle question avec les détails fournis.
        getQuestions(): Récupère toutes les questions de la base de données.
        updateQuestion(id, updatedQuestion): Met à jour une question existante basée sur son id.
        deleteQuestion(id): Supprime une question basée sur son id.

response.js

    Description: Ce module gère toutes les opérations liées aux réponses.
    Structure des Données:
        id: ObjectId, identifiant unique pour chaque réponse.
        questionId: ObjectId, identifiant de la question associée.
        responseText: String, le texte de la réponse.
        isCorrect: Boolean, indique si la réponse est correcte.
        createdAt: Date, la date de création de la réponse.
    Fonctions principales:
        createResponse(response): Crée une nouvelle réponse avec les détails fournis.
        getResponses(): Récupère toutes les réponses.
        updateResponse(id, updatedResponse): Met à jour une réponse existante basée sur son id.
        deleteResponse(id): Supprime une réponse basée sur son id.

survey-controller.js

    Description: Ce module contient la logique pour les enquêtes, combinant les questions et les réponses.
    Structure des Données:
        id: ObjectId, identifiant unique pour chaque enquête.
        name: String, le nom de l'enquête.
        description: String, une brève description de l'enquête.
        createdAt: Date, la date de création de l'enquête.
        createdBy: Object, les détails de l'utilisateur ayant créé l'enquête.
        questions: Array, une liste d'ID de questions associées à l'enquête.
    Fonctions principales:
        createSurvey(survey): Crée une nouvelle enquête avec les détails fournis.
        getSurveys(): Récupère toutes les enquêtes.
        updateSurvey(id, updatedSurvey): Met à jour une enquête existante basée sur son id.
        deleteSurvey(id): Supprime une enquête basée sur son id.    


6. **Configurez la base de données :**

    - Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale.
    - Mettez les paramètres de connexion dans `config/db.js`.

7. **Description du Code :**
    Importation des Modules
    const { MongoClient } = require('mongodb');
        Le module mongodb est utilisé pour interagir avec la base de données MongoDB.


## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm start 
```

## Authors

[OusmaneLyDev](https://github.com/OusmaneLyDev)