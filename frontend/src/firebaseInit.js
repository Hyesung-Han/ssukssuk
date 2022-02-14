import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCc5w5CtLSH5xaYEQT7yn-9hhfdOpdH42Y',
  authDomain: 'jeans-ec286.firebaseapp.com',
  projectId: 'jeans-ec286',
  storageBucket: 'jeans-ec286.appspot.com',
  messagingSenderId: '317206515838',
  appId: '1:317206515838:web:ce766327a27a01446f082f',
  measurementId: 'G-Z5VXFQXWK7',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
