import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBacgHzskI4p7dbJl0qEqS5Ebs62TnGnPs",
  authDomain: "react-app-59756.firebaseapp.com",
  projectId: "react-app-59756",
  storageBucket: "react-app-59756.appspot.com",
  messagingSenderId: "25320623642",
  appId: "1:25320623642:web:54d1ada13f0827aa4dcba3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
