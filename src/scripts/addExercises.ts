import API from '../api';
import {IExercise} from '../interfaces';

const exercises: Array<IExercise> = [
  {
    text: 'My brother and sister are here',
    translation: 'Meinem Bruder und meiner Schwester sind hier',
    match: {
      original: 'brother',
      translation: 'bruder',
    },
    translatedLiterallyFrom: 'My brother and my sister are here',
    options: ['ohrwurm', 'kummerspeck', 'bruder', 'fernweh'],
    lang: 'English/German',
  },
  {
    text: 'Who are you',
    translation: 'Wer bist du',
    match: {
      original: 'who',
      translation: 'wer',
    },
    translatedLiterallyFrom: 'Who are you',
    options: ['Innerer', 'fernweh', 'kummerspeck', 'wer'],
    lang: 'English/German',
  },
  {
    text: 'The lion is in the cage',
    translation: 'Der Löwe ist im Käfig',
    match: {
      original: 'cage',
      translation: 'Käfig',
    },
    translatedLiterallyFrom: 'The lion is in cage',
    options: ['käfig', 'bitte', 'danke', 'purzelbaum'],
    lang: 'English/German',
  },
  {
    text: 'When are you back in town',
    translation: 'Wann bist du wieder in der Stadt?',
    match: {
      original: 'back',
      translation: 'wieder',
    },
    translatedLiterallyFrom: 'When are you back in the town',
    options: ['hallo', 'moment', 'wieder', 'alles'],
    lang: 'English/German',
  },
];
const api = new API();

const addExercises = async () => {
  try {
    console.info('Seeding Exercises into database...');
    await Promise.all(
      exercises.map(exercise => {
        // validate translatedLiterallyFrom
        if (
          exercise.translation.split(' ').length !==
          exercise.translatedLiterallyFrom.split(' ').length
        ) {
          throw new Error(
            'translatedLiterallyFrom and translation must have same number of words',
          );
        }
        // validate match.original
        if (
          !exercise.text
            .toLowerCase()
            .includes(exercise.match.original.toLowerCase())
        ) {
          throw new Error('Word to be translated must exist in original text');
        }
        // validate match.translation
        if (
          !exercise.translation
            .toLowerCase()
            .includes(exercise.match.translation.toLowerCase())
        ) {
          throw new Error('Translated word must exist in translated text');
        }
        // validate match.translation
        if (
          !exercise.options
            .map(option => option.toLowerCase())
            .includes(exercise.match.translation.toLowerCase())
        ) {
          throw new Error('Translated word must exist in options');
        }
        return api.addExercise(exercise);
      }),
    );
    console.log('Done seedding! 😇');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};
addExercises();
