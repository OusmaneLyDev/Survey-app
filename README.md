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

```bash
    git clone https://github.com/OusmaneLyDev/Survey-app.git
```

2. **Accédez au dossier du projet :**

    ```bash
    cd Survey-app

    ```

3. **Installez les dépendances :**

    ```bash
    npm install
    ```

4. **Structure du Projet :**

    src/
        index.js: Fichier principal contenant le code de l'application.
        src2/
            db.js: Fichier de configuration pour la connexion à la base de données MongoDB.

        question.js:(id: INT, questionText: string, category: string, createdAt: Date)
            Gère les opérations CRUD pour les questions.
        response.js: (id: int, responseText: string, responseText: Boolean, createdAt: Date)
            Gère les opérations CRUD pour les réponses.
        survey-controller.js: (id: INT, name: string, description: string, createdAt: Date, createdBy: Objet, )
            Contient la logique pour les enquêtes.

   Leurs fonctions principales:

        create: Crée un module avec les détails fournis.
        get(): Récupère .
        updateid): Met à jour un module existant basé sur son id.
        delete(id): Supprime un module basé sur son id.      


5. **Configurez la base de données :**

    - Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale.
    - Mettez les paramètres de connexion dans `config/db.js`.

6. **Description du Code :**
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