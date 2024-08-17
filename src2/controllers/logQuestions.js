// Exemple de données
const questions = [
    {
      _id: '66c0995603942ce2c2c4e4ca',
      questionId: 5,
      title: 'Comment avez-vous entendu parler de nous ?',
      type: 'singleChoice',
      responses: [
        { answerId: 1, title: 'Publicité en ligne' },
        { answerId: 2, title: 'Bouche-à-oreille' },
        { answerId: 3, title: 'Référencement' },
        { answerId: 4, title: 'Autre' }
      ]
    }
  ];
  
  console.log(JSON.stringify(questions, null, 2));
  