// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALa0TaURAJ90ouIVm6dwFTT4JMj7owQwo",
  authDomain: "share-it-cb5ad.firebaseapp.com",
  projectId: "share-it-cb5ad",
  storageBucket: "share-it-cb5ad.appspot.com",
  messagingSenderId: "658746563792",
  appId: "1:658746563792:web:d5ecab91e0042d030452d5",
  measurementId: "G-ECHH8SC419"
};

const app = initializeApp(firebaseConfig);
export { app };
// Optionally initialize analytics
// const analytics = getAnalytics(app);
