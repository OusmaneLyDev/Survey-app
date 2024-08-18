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

    src2/
        index.js: Fichier principal contenant le code de l'application.
        src2/config
            database.js: Fichier de configuration pour la connexion à la base de données MongoDB.

5.  **Modules et Fonctions**


questionModule.js

    Description: Ce module gère les opérations CRUD de la collection questions.
    Structure des Données:
        id: ObjectId, identifiant unique pour chaque question.
        questionText: String, le texte de la question.
        category: String, la catégorie de la question.
        createdAt: Date, la date de création de la question.
    Fonctions principales:
        addQuestion(question): ajouter une document dans la collection questions.
        getQuestions(): Affiche toute les documents de la collection questions.
        updateQuestion(id, updatedQuestion): Met à jour un document sur la collection questions.
        destroyQuestion(id): Supprime un document dans la collection questions .

answerModule.js

    Description: Ce module gère les opérations CRUD de la collection answers.
    Structure des Données:
        id: ObjectId, identifiant unique pour chaque réponse.
        questionId: ObjectId, identifiant de la question associée.
        responseText: String, le texte de la réponse.
        isCorrect: Boolean, indique si la réponse est correcte.
        createdAt: Date, la date de création de la réponse.
    Fonctions principales:
        addQuestion(question): ajouter une document dans la collection answers.
        getQuestions(): Affiche toute les documents de la collection answers.
        updateQuestion(id, updatedQuestion): Met à jour un document sur la collection answers.
        destroyQuestion(id): Supprime un document .

surveyModule.js

    Description: Ce module gére les opérations CRUD de la collection surveys.
    Structure des Données:
        id: ObjectId, identifiant unique pour chaque enquête.
        name: String, le nom de l'enquête.
        description: String, une brève description de l'enquête.
        createdAt: Date, la date de création de l'enquête.
        createdBy: Object, les détails de l'utilisateur ayant créé l'enquête.
        questions: Array, une liste d'ID de questions associées à l'enquête.
    Fonctions principales:
       addQuestion(question): ajouter une document dans la collection surveys.
        getQuestions(): Affiche toute les documents de la collection surveys.
        updateQuestion(id, updatedQuestion): Met à jour un document sur la collection surveys.
        destroyQuestion(id): Supprime un document .


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