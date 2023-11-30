import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDlTzaYsjlM_u0vk4dgU069m13E2Mivg_A",
    authDomain: "image-uploader-15773.firebaseapp.com",
    projectId: "image-uploader-15773",
    storageBucket: "image-uploader-15773.appspot.com",
    messagingSenderId: "17097343905",
    appId: "1:17097343905:web:5dadb80af53ca0354e01e0"
  };

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)