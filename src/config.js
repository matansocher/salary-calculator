import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyApPm4Z_dcY_TeULM81zVMHKKqMC1ypIjw",
  authDomain: "salary-calculator-81126.firebaseapp.com",
  databaseURL: "https://salary-calculator-81126.firebaseio.com",
  projectId: "salary-calculator-81126",
  storageBucket: "salary-calculator-81126.appspot.com",
  messagingSenderId: "333633462301"
};

const fire = firebase.initializeApp(config);
export default fire;
