import {FirebaseApp, initializeApp} from 'firebase/app';
import {
  collection,
  addDoc,
  query,
  getDocs,
  getFirestore,
  Firestore,
  DocumentReference,
  where,
} from 'firebase/firestore';
import {IAPI, IExercise} from '../interfaces';

class API implements IAPI {
  private app: FirebaseApp;
  private db: Firestore;
  private dbName: string;
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCSC7MBHAASpBk48aJqGAqG1B3H3TO8mhM',
      authDomain: 'lltest-b8982.firebaseapp.com',
      projectId: 'lltest-b8982',
      storageBucket: 'lltest-b8982.appspot.com',
      messagingSenderId: '573576315311',
      appId: '1:573576315311:web:d7023a3fe12f227610af5a',
      measurementId: 'G-PDDPKYYTZ4',
    };
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore();
    this.dbName = 'exercises';
  }

  addExercise(exercise: IExercise): Promise<DocumentReference | Error> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await addDoc(collection(this.db, this.dbName), {
          ...exercise,
        });
        resolve(docRef);
      } catch (error) {
        reject(error);
      }
    });
  }

  getExercises(lang: string): Promise<object | Error> {
    return new Promise(async (resolve, reject) => {
      try {
        const exercises: Array<object> = [];
        const q = await query(
          collection(this.db, this.dbName),
          where('lang', '==', lang),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          exercises.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(exercises);
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default API;
