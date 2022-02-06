import API from '../api';
import {IExercise} from '../interfaces';

const exercises: Array<IExercise> = [
  {
    text: 'The house is small',
    translation: 'Das Haus ist klein',
    match: {
      original: 'house',
      translation: 'haus',
    },
    translatedLiterallyFrom: 'The house is small',
    options: ['haus', 'stuff', 'other', 'stuff'],
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
    process.exit();
  }
};
addExercises();
