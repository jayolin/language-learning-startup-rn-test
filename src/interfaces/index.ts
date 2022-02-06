import {DocumentReference} from 'firebase/firestore';

interface Match {
  original: string;
  translation: string;
}
export interface IExercise {
  text: string;
  match: Match;
  translation: string;
  translatedLiterallyFrom: string;
  options: Array<string>;
  lang: string;
}
export interface ExerciseDoc extends IExercise {
  lang: string;
}

export interface IAPI {
  addExercise: (exercise: IExercise) => Promise<DocumentReference | Error>;
  getExercises: (lang: string) => Promise<object | Error>;
}
